/**
 * filesystem.js
 *
 * Synchronous in-memory virtual filesystem
 * with asynchronous IndexedDB persistence.
 *
 * Permission model:
 *
 * - User 0 is root/system and has unrestricted access.
 * - Owners can manage permissions and attributes on their objects.
 * - Reading a file requires read permission.
 * - Writing a file requires write permission.
 * - Entering/traversing a directory requires execute permission.
 * - Listing a directory requires read + execute permission.
 * - Creating files/folders requires write + execute on the parent.
 * - Deleting files/folders requires delete on the object
 *   AND write + execute on the parent.
 * - Non-root users automatically own objects they create.
 * - Only root may create objects owned by another user.
 * - Only root or the owner may modify permissions/attributes.
 *
 * Normal filesystem operations remain synchronous.
 * Only IndexedDB persistence is asynchronous.
 */

class FileSystem {

    //=====================================================
    // Constructor
    //=====================================================

    constructor(nodeID = 0) {

        this.nodeID = nodeID;

        this.currentPath = "C:\\";

        this.root =
            this.createFolderObject("C:", 0);

        /*
         * Serializes IndexedDB writes for this filesystem
         * instance.
         */
        this._savePromise =
            Promise.resolve();

        this.loaded = false;

        this.existsOnDisk = false;

    }


    //=====================================================
    // IndexedDB
    //=====================================================

    static DB_NAME =
        "VirtualFileSystemDB";

    static DB_VERSION = 1;

    static STORE_NAME =
        "filesystems";


    static openDatabase() {

        return new Promise((resolve, reject) => {

            const request =
                indexedDB.open(
                    FileSystem.DB_NAME,
                    FileSystem.DB_VERSION
                );


            request.onupgradeneeded =
                function (event) {

                    const db =
                        event.target.result;

                    if (
                        !db.objectStoreNames.contains(
                            FileSystem.STORE_NAME
                        )
                    ) {

                        db.createObjectStore(
                            FileSystem.STORE_NAME
                        );

                    }

                };


            request.onsuccess =
                function () {

                    resolve(
                        request.result
                    );

                };


            request.onerror =
                function () {

                    reject(
                        request.error
                    );

                };

        });

    }


    static async load(nodeID) {

        const fs =
            new FileSystem(nodeID);

        const db =
            await FileSystem.openDatabase();


        const data =
            await new Promise(
                (resolve, reject) => {

                    const transaction =
                        db.transaction(
                            FileSystem.STORE_NAME,
                            "readonly"
                        );

                    const store =
                        transaction.objectStore(
                            FileSystem.STORE_NAME
                        );

                    const request =
                        store.get(nodeID);


                    request.onsuccess =
                        function () {

                            resolve(
                                request.result || null
                            );

                        };


                    request.onerror =
                        function () {

                            reject(
                                request.error
                            );

                        };

                }
            );


        db.close();


        /*
        * This is different from checking:
        *
        * fs.exists("C:\\")
        *
        * because a brand-new FileSystem already has
        * a C:\ root in memory.
        */
        fs.existsOnDisk =
            !!data;


        if (data) {

            fs.root =
                data.root;

        }


        fs.loaded = true;

        return fs;
    }


    //=====================================================
    // Save
    //=====================================================

    save() {

        /*
         * Take the snapshot immediately.
         *
         * This prevents later filesystem changes from
         * changing the data that this particular save
         * operation is supposed to write.
         */
        const snapshot =
            structuredClone({
                root: this.root
            });


        /*
         * Keep saves serialized.
         *
         * The catch() is important:
         *
         * If one save fails, the promise chain must not
         * become permanently rejected.
         */
        this._savePromise =
            this._savePromise
                .catch(error => {

                    console.error(
                        "Previous filesystem save failed:",
                        error
                    );

                })
                .then(async () => {

                    const db =
                        await FileSystem.openDatabase();


                    try {

                        await new Promise(
                            (resolve, reject) => {

                                const transaction =
                                    db.transaction(
                                        FileSystem.STORE_NAME,
                                        "readwrite"
                                    );

                                const store =
                                    transaction.objectStore(
                                        FileSystem.STORE_NAME
                                    );


                                store.put(
                                    snapshot,
                                    this.nodeID
                                );


                                transaction.oncomplete =
                                    resolve;


                                transaction.onerror =
                                    () => reject(
                                        transaction.error
                                    );


                                transaction.onabort =
                                    () => reject(
                                        transaction.error ||
                                        new Error(
                                            "IndexedDB transaction aborted."
                                        )
                                    );

                            }
                        );

                    } finally {

                        db.close();

                    }

                });


        return this._savePromise;
    }


    //=====================================================
    // Delete Saved Filesystem
    //=====================================================

    static async delete(nodeID) {

        const db =
            await FileSystem.openDatabase();


        try {

            await new Promise(
                (resolve, reject) => {

                    const transaction =
                        db.transaction(
                            FileSystem.STORE_NAME,
                            "readwrite"
                        );

                    const store =
                        transaction.objectStore(
                            FileSystem.STORE_NAME
                        );


                    store.delete(nodeID);


                    transaction.oncomplete =
                        resolve;


                    transaction.onerror =
                        () => reject(
                            transaction.error
                        );


                    transaction.onabort =
                        () => reject(
                            transaction.error ||
                            new Error(
                                "IndexedDB transaction aborted."
                            )
                        );

                }
            );

        } finally {

            db.close();

        }

    }


    //=====================================================
    // Path Tab Completion
    //=====================================================

    tabComplete(
        input,
        userID = 0
    ) {

        input =
            String(input)
                .replace(/\//g, "\\");


        /*
        * Determine the directory being searched and
        * the partial path segment being completed.
        *
        * Examples:
        *
        *   "Doc"
        *       directory = "."
        *       partial   = "Doc"
        *
        *   "Documents\\Pro"
        *       directory = "Documents"
        *       partial   = "Pro"
        *
        *   "C:\\Documents\\Pro"
        *       directory = "C:\\Documents"
        *       partial   = "Pro"
        */

        const lastSlash =
            input.lastIndexOf("\\");


        let directory;
        let partial;


        if (lastSlash === -1) {

            directory = ".";

            partial = input;

        } else {

            directory =
                input.slice(
                    0,
                    lastSlash
                );

            partial =
                input.slice(
                    lastSlash + 1
                );

            /*
            * "C:\\" means the root directory.
            */
            if (
                directory === "C:"
            ) {

                directory = "C:\\";

            }

        }


        /*
        * Resolve the directory portion relative to
        * the current working directory.
        */
        const directoryPath =
            this.resolvePath(
                directory || "."
            );


        /*
        * Get the directory while respecting permissions.
        */
        const folder =
            this.getFolderForUser(
                directoryPath,
                userID
            );


        if (!folder) {

            return [];

        }


        /*
        * Listing a directory requires read permission.
        */
        if (
            !this.hasPermission(
                folder,
                userID,
                "read"
            )
        ) {

            return [];

        }


        const lowerPartial =
            partial.toLowerCase();

        const matches = [];


        /*
        * Complete folders.
        */
        for (
            const name of
            Object.keys(folder.folders)
        ) {

            if (
                name
                    .toLowerCase()
                    .startsWith(
                        lowerPartial
                    )
            ) {

                matches.push({

                    name,

                    type: "folder",

                    path:
                        directoryPath === "C:\\"
                            ? `C:\\${name}`
                            : `${directoryPath}\\${name}`

                });

            }

        }


        /*
        * Complete files.
        */
        for (
            const name of
            Object.keys(folder.files)
        ) {

            if (
                name
                    .toLowerCase()
                    .startsWith(
                        lowerPartial
                    )
            ) {

                matches.push({

                    name,

                    type: "file",

                    path:
                        directoryPath === "C:\\"
                            ? `C:\\${name}`
                            : `${directoryPath}\\${name}`

                });

            }

        }


        /*
        * Sort folders before files.
        */
        matches.sort(
            (a, b) => {

                if (
                    a.type !== b.type
                ) {

                    return a.type === "folder"
                        ? -1
                        : 1;

                }

                return a.name.localeCompare(
                    b.name
                );

            }
        );


        return matches;
    }

    //=====================================================
    // Object Creation
    //=====================================================

    createFolderObject(
        name,
        owner
    ) {

        return {

            type: "folder",

            name,

            owner,

            attributes: {

                readOnly: false,
                hidden: false,
                system: false,
                archive: false

            },

            permissions: {

                /*
                 * Root
                 */
                "0": {

                    read: true,
                    write: true,
                    delete: true,
                    execute: true

                },

                /*
                 * Owner
                 */
                [owner]: {

                    read: true,
                    write: true,
                    delete: true,
                    execute: true

                },

                /*
                 * Everyone else
                 */
                "*": {

                    read: true,
                    write: false,
                    delete: false,
                    execute: true

                }

            },

            folders: {},

            files: {}

        };
    }


    createFileObject(
        name,
        owner,
        content
    ) {

        return {

            type: "file",

            name,

            owner,

            extension:
                name.includes(".")
                    ? name
                        .split(".")
                        .pop()
                        .toLowerCase()
                    : "",

            size:
                String(content).length,

            content:
                String(content),

            attributes: {

                readOnly: false,
                hidden: false,
                system: false,
                archive: true

            },

            permissions: {

                /*
                 * Root
                 */
                "0": {

                    read: true,
                    write: true,
                    delete: true,
                    execute: true

                },

                /*
                 * Owner
                 */
                [owner]: {

                    read: true,
                    write: true,
                    delete: true,
                    execute: true

                },

                /*
                 * Everyone else
                 */
                "*": {

                    read: true,
                    write: false,
                    delete: false,
                    execute: true

                }

            }

        };
    }


    //=====================================================
    // Path Helpers
    //=====================================================

    parsePath(path) {

        path =
            this.resolvePath(path);

        path =
            path.replace(/\//g, "\\");


        if (!path.startsWith("C:\\")) {

            return "Path must begin with C:\\";

        }


        return path
            .slice(3)
            .split("\\")
            .filter(Boolean);
    }


    getFolder(path) {

        path =
            this.resolvePath(path);

        const parts =
            this.parsePath(path);


        let current =
            this.root;


        for (const part of parts) {

            if (
                !current.folders[part]
            ) {

                return null;

            }


            current =
                current.folders[part];

        }


        return current;
    }


    /*
     * Same as getFolder(), but checks execute
     * permission while traversing the tree.
     */
    getFolderForUser(
        path,
        userID = 0
    ) {

        path =
            this.resolvePath(path);

        const parts =
            this.parsePath(path);


        let current =
            this.root;


        for (const part of parts) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return null;

            }

        }


        return current;
    }


    getItem(path) {

        path =
            this.resolvePath(path);


        if (
            path === "C:\\" ||
            path === "C:"
        ) {

            return this.root;

        }


        const parts =
            this.parsePath(path);


        let current =
            this.root;


        for (
            let i = 0;
            i < parts.length;
            i++
        ) {

            const part =
                [i];


            if (
                i ===
                parts.length - 1
            ) {

                if (
                    current.folders[part]
                ) {

                    return current.folders[part];

                }


                if (
                    current.files[part]
                ) {

                    return current.files[part];

                }


                return null;

            }


            current =
                current.folders[part];


            if (!current) {

                return null;

            }

        }


        return current;
    }


    exists(path) {

        return !!this.getItem(path);
    }


    //=====================================================
    // Permission System
    //=====================================================

    hasPermission(
        item,
        userID,
        permission
    ) {

        /*
         * User 0 is root/system.
         */
        if (userID === 0)
            return true;


        if (!item || !item.permissions)
            return false;


        const perms =
            item.permissions[userID] ||
            item.permissions["*"];


        if (!perms)
            return false;


        return !!perms[permission];
    }


    requirePermission(
        item,
        userID,
        permission
    ) {

        if (!item) {

            return "Object not found.";

        }


        if (
            !this.hasPermission(
                item,
                userID,
                permission
            )
        ) {

            return `User ${userID} lacks '${permission}' permission.`;

        }


        /*
         * Root ignores read-only.
         */
        if (
            userID !== 0 &&
            permission !== "read" &&
            item.attributes.readOnly
        ) {

            return "Object is read-only.";

        }


        return true;
    }


    /*
     * Only root or the owner can administer an object.
     */
    requireOwner(
        item,
        userID
    ) {

        if (!item) {

            return "Object not found.";

        }


        if (userID === 0)
            return true;


        if (
            item.owner !== userID
        ) {

            return `User ${userID} is not the owner.`;

        }


        return true;
    }


    /*
     * Creating/deleting entries inside a directory
     * requires both:
     *
     * execute = allowed to access/traverse directory
     * write   = allowed to modify directory contents
     */
    requireDirectoryWrite(
        folder,
        userID
    ) {

        if (!folder) {

            return "Directory not found.";

        }


        this.requirePermission(
            folder,
            userID,
            "execute"
        );


        this.requirePermission(
            folder,
            userID,
            "write"
        );


        return true;
    }


    getPermissions(
        path,
        userID
    ) {

        const item =
            this.getItem(path);


        if (!item) {
            return null;
        }


        if (userID === 0) {

            return {

                read: true,
                write: true,
                delete: true,
                execute: true

            };

        }


        const perms =
            item.permissions[userID] ||
            item.permissions["*"];


        if (!perms) {

            return {

                read: false,
                write: false,
                delete: false,
                execute: false

            };

        }


        return {

            read: !!perms.read,
            write: !!perms.write,
            delete: !!perms.delete,
            execute: !!perms.execute

        };
    }


    grantPermissions(
        path,
        targetUserID,
        perms,
        actorUserID = 0
    ) {

        const item =
            this.getItem(path);


        if (!item)
            return "Not found.";


        /*
         * Only root or owner can modify permissions.
         */
        this.requireOwner(
            item,
            actorUserID
        );


        const allowedPermissions = [

            "read",
            "write",
            "delete",
            "execute"

        ];


        for (
            const key of
            Object.keys(perms)
        ) {

            if (
                !allowedPermissions.includes(
                    key
                )
            ) {

                return `Invalid permission '${key}'.`;

            }


            if (
                typeof perms[key] !==
                "boolean"
            ) {

                return `Permission '${key}' must be boolean.`;

            }

        }


        /*
         * Owners may only grant permissions they
         * themselves possess.
         *
         * Root is unrestricted.
         */
        if (actorUserID !== 0) {

            const actorPermissions =
                this.getPermissions(
                    path,
                    actorUserID
                );


            for (
                const permission
                of allowedPermissions
            ) {

                if (
                    perms[permission] === true &&
                    !actorPermissions[permission]
                ) {

                    return `Cannot grant '${permission}' permission you do not possess.`;

                }

            }

        }


        /*
         * Owner's permission record must always exist.
         */
        if (
            targetUserID === item.owner
        ) {

            if (
                !item.permissions[targetUserID]
            ) {

                item.permissions[targetUserID] = {

                    read: true,
                    write: true,
                    delete: true,
                    execute: true

                };

            }

        } else {

            if (
                !item.permissions[targetUserID]
            ) {

                item.permissions[targetUserID] = {

                    read: false,
                    write: false,
                    delete: false,
                    execute: false

                };

            }

        }


        Object.assign(
            item.permissions[targetUserID],
            perms
        );


        /*
         * Owner must always retain full control.
         */
        item.permissions[item.owner] = {

            read: true,
            write: true,
            delete: true,
            execute: true

        };

        return true;
    }


    revokeUser(
        path,
        targetUserID,
        actorUserID = 0
    ) {

        const item =
            this.getItem(path);


        if (!item)
            return "Not found.";


        this.requireOwner(
            item,
            actorUserID
        );


        /*
         * Never revoke root.
         */
        if (targetUserID === 0) {

            return "Cannot revoke root permissions.";

        }


        /*
         * Never revoke the owner's permissions.
         */
        if (
            targetUserID === item.owner
        ) {

            return "Cannot revoke the owner's permissions.";

        }


        delete item.permissions[
            targetUserID
        ];

        return true;
    }


    setAttributes(
        path,
        attrs,
        userID = 0
    ) {

        const item =
            this.getItem(path);


        if (!item)
            return "Not found.";


        /*
         * Only owner/root can change attributes.
         */
        this.requireOwner(
            item,
            userID
        );


        const allowedAttributes = [

            "readOnly",
            "hidden",
            "system",
            "archive"

        ];


        for (
            const key of
            Object.keys(attrs)
        ) {

            if (
                !allowedAttributes.includes(
                    key
                )
            ) {

                return `Invalid attribute '${key}'.`;

            }


            if (
                typeof attrs[key] !==
                "boolean"
            ) {

                return `Attribute '${key}' must be boolean.`;

            }

        }


        Object.assign(
            item.attributes,
            attrs
        );

        return true;
    }


    //=====================================================
    // Folder Operations
    //=====================================================

    createFolder(
        path,
        owner = 0,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        if (parts.length === 0) {

            return "Cannot create the root directory.";

        }


        const folderName =
            parts.pop();


        let current =
            this.root;


        /*
         * Traverse to parent.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return `Directory not found: ${part}`;

            }

        }


        /*
         * Parent controls creation.
         */
        this.requireDirectoryWrite(
            current,
            userID
        );


        /*
         * Don't overwrite an existing object.
         */
        if (
            current.folders[folderName]
        ) {

            return "Directory already exists.";

        }


        if (
            current.files[folderName]
        ) {

            return "A file with that name already exists.";

        }


        /*
         * Normal users cannot choose another owner.
         */
        if (userID !== 0) {

            owner =
                userID;

        }


        current.folders[folderName] =
            this.createFolderObject(
                folderName,
                owner
            );

        return true;
    }


    deleteFolder(
        path,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        if (parts.length === 0) {

            return "Cannot delete root.";

        }


        const folderName =
            parts.pop();


        let current =
            this.root;


        /*
         * Traverse to parent.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current)
                return false;

        }


        const folder =
            current.folders[folderName];


        if (!folder)
            return false;


        /*
         * Permission on the directory itself.
         */
        this.requirePermission(
            folder,
            userID,
            "delete"
        );


        /*
         * Permission to remove it from its parent.
         */
        this.requireDirectoryWrite(
            current,
            userID
        );


        delete current.folders[
            folderName
        ];

        return true;
    }


    //=====================================================
    // File Operations
    //=====================================================

    readFile(
        path,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        const filename =
            parts.pop();


        let current =
            this.root;

        //console.log(`path ${path}`)
        //console.log(`parts ${parts}`)
        //console.log(`filename ${filename}`)
        //console.log(`current ${current}`)

        /*
         * Traversing directories requires execute.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return "File not found";

            }

        }


        const file =
            current.files[filename];


        if (!file) {

            return "File not found";

        }


        this.requirePermission(
            file,
            userID,
            "read"
        );


        return file.content;
    }


    writeFile(
        path,
        text,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        const filename =
            parts.pop();


        let current =
            this.root;


        /*
         * Traversing directories requires execute.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return "File not found";

            }

        }


        const file =
            current.files[filename];


        if (!file) {

            return "File not found";

        }


        this.requirePermission(
            file,
            userID,
            "write"
        );


        file.content =
            String(text);


        file.size =
            file.content.length;

        return "File updated";
    }


    appendFile(
        path,
        text,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        const filename =
            parts.pop();


        let current =
            this.root;


        /*
         * Traversing directories requires execute.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return "File not found";

            }

        }


        const file =
            current.files[filename];


        if (!file) {

            return "File not found";

        }


        this.requirePermission(
            file,
            userID,
            "write"
        );


        file.content +=
            String(text);


        file.size =
            file.content.length;

        return "Text appended";
    }


    createFile(
        path,
        size = 0,
        owner = 0,
        content = "",
        userID = 0
    ) {

        /*
         * Backwards compatibility:
         *
         * createFile(
         *     path,
         *     0,
         *     "hello"
         * )
         *
         * becomes:
         *
         * owner = 0
         * content = "hello"
         */
        if (
            typeof owner === "string" &&
            content === ""
        ) {

            content =
                owner;

            owner =
                0;

        }


        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        if (parts.length === 0) {

            return "Cannot create a file at the root.";

        }


        const filename =
            parts.pop();


        let current =
            this.root;


        /*
         * Traverse to parent.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current) {

                return "Folder not found.";

            }

        }


        /*
         * Parent controls file creation.
         */
        this.requireDirectoryWrite(
            current,
            userID
        );


        /*
         * Don't silently overwrite anything.
         */
        if (
            current.files[filename]
        ) {

            return "File already exists.";

        }


        if (
            current.folders[filename]
        ) {

            return "A folder with that name already exists.";

        }


        /*
         * Normal users automatically become the owner.
         */
        if (userID !== 0) {

            owner =
                userID;

        }


        current.files[filename] =
            this.createFileObject(
                filename,
                owner,
                content
            );

        return true;
    }


    deleteFile(
        path,
        userID = 0
    ) {

        path =
            this.resolvePath(path);


        const parts =
            this.parsePath(path);


        const filename =
            parts.pop();


        let current =
            this.root;


        /*
         * Traverse to parent.
         */
        for (
            const part of parts
        ) {

            this.requirePermission(
                current,
                userID,
                "execute"
            );


            current =
                current.folders[part];


            if (!current)
                return false;

        }


        const file =
            current.files[filename];


        if (!file)
            return false;


        /*
         * User must have delete permission on
         * the file.
         */
        this.requirePermission(
            file,
            userID,
            "delete"
        );


        /*
         * User must also have permission to modify
         * the containing directory.
         */
        this.requireDirectoryWrite(
            current,
            userID
        );


        delete current.files[
            filename
        ];

        return true;
    }


    //=====================================================
    // Directory Listing
    //=====================================================

    list(
        path = ".",
        userID = 0,
        showDetails = false
    ) {

        path =
            this.resolvePath(path);


        const folder =
            this.getFolderForUser(
                path,
                userID
            );


        if (!folder) {

            return "Directory not found";

        }


        /*
         * Listing requires read permission.
         *
         * getFolderForUser() already verified
         * execute permission through the path.
         */
        try {

            this.requirePermission(
                folder,
                userID,
                "read"
            );

        } catch (err) {

            return err.message;

        }


        const output = [];


        output.push(
            `Directory of ${path}`
        );


        /*
         * Folders.
         */
        for (
            const child of
            Object.values(folder.folders)
        ) {

            let line =
                `<DIR> ${child.name}`;


            if (showDetails) {

                line +=
                    this.formatDetails(
                        child,
                        userID
                    );

            }


            output.push(line);

        }


        /*
         * Files.
         */
        for (
            const file of
            Object.values(folder.files)
        ) {

            let line =
                `${file.name}`;


            if (showDetails) {

                line +=
                    ` ${file.size} bytes`;


                line +=
                    this.formatDetails(
                        file,
                        userID
                    );

            }


            output.push(line);

        }


        if (
            output.length === 1
        ) {

            output.push(
                "(empty)"
            );

        }


        return output.join("\n");
    }


    //=====================================================
    // Serialization
    //=====================================================

    toJSON() {

        return JSON.stringify(
            this.root,
            null,
            4
        );
    }


    /*
     * Replacing the entire filesystem is a privileged
     * operation.
     */
    fromJSON(
        json,
        userID = 0
    ) {

        if (userID !== 0) {

            return "Only root can import a filesystem.";

        }


        const parsed =
            JSON.parse(json);


        if (
            !parsed ||
            parsed.type !== "folder"
        ) {

            return "Invalid filesystem data.";

        }


        this.root =
            parsed;


        this.currentPath =
            "C:\\";

        return true;
    }


    //=====================================================
    // Tree Printing
    //=====================================================

    print(
        folder = this.root,
        indent = ""
    ) {

        console.log(
            `${indent}${folder.name}/`
        );


        for (
            const child of
            Object.values(folder.folders)
        ) {

            this.print(
                child,
                indent + "    "
            );

        }


        for (
            const file of
            Object.values(folder.files)
        ) {

            console.log(
                `${indent}    ${file.name}`
            );

        }

    }


    //=====================================================
    // Navigation
    //=====================================================

    getCurrentDirectory() {

        return this.currentPath;
    }


    changeDirectory(
        path,
        userID = 0
    ) {

        const fullPath =
            this.resolvePath(path);


        const folder =
            this.getFolderForUser(
                fullPath,
                userID
            );


        if (!folder) {

            return "Directory not found";

        }


        /*
         * User must be able to execute the destination
         * directory.
         */
        try {

            this.requirePermission(
                folder,
                userID,
                "execute"
            );

        } catch (err) {

            return err.message;

        }


        this.currentPath =
            fullPath;


        return this.currentPath;
    }


    //=====================================================
    // Path Resolution
    //=====================================================

    resolvePath(
        path = "."
    ) {

        path =
            String(path)
                .replace(/\//g, "\\");


        if (
            path === "\\" ||
            path === "C:" ||
            path === "C:\\"
        ) {

            return "C:\\";

        }


        let parts;


        /*
         * Absolute path.
         */
        if (
            path.startsWith("C:\\")
        ) {

            parts =
                path
                    .slice(3)
                    .split("\\")
                    .filter(Boolean);

        }


        /*
         * Relative path.
         */
        else {

            parts =
                this.currentPath
                    .slice(3)
                    .split("\\")
                    .filter(Boolean);


            for (
                const part of
                path.split("\\")
            ) {

                switch (part) {

                    case "":
                    case ".":

                        break;


                    case "..":

                        if (
                            parts.length > 0
                        ) {

                            parts.pop();

                        }

                        break;


                    default:

                        parts.push(part);

                        break;

                }

            }

        }


        return "C:\\" +
            parts.join("\\");
    }


    //=====================================================
    // Formatting
    //=====================================================

    formatDetails(
        item,
        userID
    ) {

        const perms =
            item.permissions[userID] ||
            item.permissions["*"] ||
            {};


        const permissionString = [

            perms.read
                ? "R"
                : "-",

            perms.write
                ? "W"
                : "-",

            perms.delete
                ? "D"
                : "-",

            perms.execute
                ? "X"
                : "-"

        ].join("");


        const attributes = [

            item.attributes.readOnly
                ? "R"
                : "-",

            item.attributes.hidden
                ? "H"
                : "-",

            item.attributes.system
                ? "S"
                : "-",

            item.attributes.archive
                ? "A"
                : "-"

        ].join("");


        let ownerName =
            "unknown";


        /*
         * Keep compatibility with your existing
         * nodes/player/account system.
         */
        if (
            typeof nodes !== "undefined" &&
            typeof player !== "undefined" &&
            player &&
            Array.isArray(
                player.nodeStack
            )
        ) {

            const nodeID =
                player.nodeStack[
                    player.nodeStack.length - 1
                ];


            const node =
                nodes[nodeID];


            if (
                node &&
                Array.isArray(node.accounts)
            ) {

                for (
                    const account
                    of node.accounts
                ) {

                    if (
                        account.userId ==
                        item.owner
                    ) {

                        ownerName =
                            account.user;

                        break;

                    }

                }

            }

        }


        return (
            ` ${permissionString}` +
            `${attributes}` +
            ` ${ownerName}`
        );
    }
}
