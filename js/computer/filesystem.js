/**
 * filesystem.js
 *
 * Simple DOS-style virtual filesystem with:
 *  - Folder creation/deletion
 *  - File creation/deletion
 *  - DOS-style paths (C:\Folder\File.txt)
 *  - Multi-user permissions (user IDs)
 *  - JSON serialization
 *
 * Permission model:
 *  - Every object has an owner (user ID)
 *  - Every object has a permissions table indexed by user ID.
 *  - User ID 0 is the administrator and bypasses all permission checks.
 */

class FileSystem {

    constructor() {
        this.root = this.createFolderObject("C:", 0);
        this.currentPath = "C:\\";
    }

    //=====================================================
    // Object Creation
    //=====================================================

    createFolderObject(name, owner) {
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
                "0": {
                    read: true,
                    write: true,
                    delete: true,
                    execute: true
                },
                [owner]: {
                    read: true,
                    write: true,
                    delete: true,
                    execute: true
                },
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

    createFileObject(name, owner, content) {
        return {
            type: "file",
            name,
            owner,

            extension: name.includes(".")
                ? name.split(".").pop().toLowerCase()
                : "",

            size: content.length,
            content,

            attributes: {
                readOnly: false,
                hidden: false,
                system: false,
                archive: true
            },

            permissions: {
                "0": {
                    read: true,
                    write: true,
                    delete: true,
                    execute: true
                },
                [owner]: {
                    read: true,
                    write: true,
                    delete: true,
                    execute: true
                },
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

        path = this.resolvePath(path);
        path = path.replace(/\//g, "\\");

        if (!path.startsWith("C:\\")) {
            throw new Error("Path must begin with C:\\");
        }

        return path
            .slice(3)
            .split("\\")
            .filter(Boolean);
    }

    getFolder(path) {
        path = this.resolvePath(path);
        const parts = this.parsePath(path);

        let current = this.root;

        for (const part of parts) {

            if (!current.folders[part]) {
                return null;
            }

            current = current.folders[part];
        }

        return current;
    }

    getItem(path) {
        path = this.resolvePath(path);
        if (path === "C:\\" || path === "C:") {
            return this.root;
        }

        const parts = this.parsePath(path);

        let current = this.root;

        for (let i = 0; i < parts.length; i++) {

            const part = parts[i];

            if (i === parts.length - 1) {

                if (current.folders[part]) {
                    return current.folders[part];
                }

                if (current.files[part]) {
                    return current.files[part];
                }

                return null;
            }

            current = current.folders[part];

            if (!current) {
                return null;
            }
        }

        return current;
    }

    //=====================================================
    // Permission System
    //=====================================================

    hasPermission(item, userID, permission) {

        if (userID === 0)
            return true;

        const perms =
            item.permissions[userID] ||
            item.permissions["*"];

        if (!perms)
            return false;

        return !!perms[permission];
    }

    requirePermission(item, userID, permission) {

        if (!this.hasPermission(item, userID, permission)) {
            throw new Error(
                `User ${userID} lacks '${permission}' permission.`
            );
        }

        if (
            permission !== "read" &&
            item.attributes.readOnly
        ) {
            throw new Error("Object is read-only.");
        }
    }

    getPermissions(path, userID) {

        const item = this.getItem(path);

        if (!item) {
            return null;
        }

        // Root user always has full access
        if (userID === 0) {
            return {
                read: true,
                write: true,
                delete: true,
                execute: true
            };
        }

        // User-specific permissions
        if (item.permissions[userID]) {
            return item.permissions[userID];
        }

        // Fall back to everyone permissions
        if (item.permissions["*"]) {
            return item.permissions["*"];
        }

        // No permissions
        return {
            read: false,
            write: false,
            delete: false,
            execute: false
        };
    }

    grantPermissions(path, userID, perms) {

        const item = this.getItem(path);

        if (!item)
            throw new Error("Not found.");

        if (!item.permissions[userID]) {

            item.permissions[userID] = {
                ...(item.permissions["*"] || {}),
                read: false,
                write: false,
                delete: false,
                execute: false
            };

        }

        Object.assign(item.permissions[userID], perms);
    }

    revokeUser(path, userID) {
        path = this.resolvePath(path);
        const item = this.getItem(path);

        if (!item)
            throw new Error("Not found.");

        delete item.permissions[userID];
    }

    setAttributes(path, attrs) {
        path = this.resolvePath(path);
        const item = this.getItem(path);

        if (!item)
            throw new Error("Not found.");

        Object.assign(item.attributes, attrs);
    }

    //=====================================================
    // Folder Operations
    //=====================================================

    createFolder(path, owner = 0) {
        path = this.resolvePath(path);
        const parts = this.parsePath(path);

        let current = this.root;

        for (const part of parts) {

            if (!current.folders[part]) {

                current.folders[part] =
                    this.createFolderObject(part, owner);

            }

            current = current.folders[part];
        }
    }

    deleteFolder(path, userID = 0) {
        path = this.resolvePath(path);
        const parts = this.parsePath(path);

        if (parts.length === 0)
            throw new Error("Cannot delete root.");

        const folderName = parts.pop();

        let current = this.root;

        for (const part of parts) {

            current = current.folders[part];

            if (!current)
                return false;
        }

        const folder = current.folders[folderName];

        if (!folder)
            return false;

        this.requirePermission(folder, userID, "delete");

        delete current.folders[folderName];

        return true;
    }

    //=====================================================
    // File Operations
    //=====================================================

    readFile(path, userID = 0) {

        path = this.resolvePath(path);
        console.log(path)
        const file = this.getItem(path);

        if (!file) {
            return "File not found";
        }

        if (!this.hasPermission(file, userID, "read")) {
            return "Access denied";
        }

        console.log(file.content);
        return file.content;
    }

    writeFile(path, text, userID = 0) {
        path = this.resolvePath(path);
        const file = this.getItem(path);

        if (!file) {
            return "File not found";
        }

        if (!this.hasPermission(file, userID, "write")) {
            return "Access denied";
        }

        file.content = text;
        file.size = text.length;

        return "File updated";
    }

    appendFile(path, text, userID = 0) {
        path = this.resolvePath(path);
        const file = this.getItem(path);

        if (!file) {
            return "File not found";
        }

        if (!this.hasPermission(file, userID, "write")) {
            return "Access denied";
        }

        file.content += text;
        file.size = file.content.length;

        return "Text appended";
    }

    createFile(path, size = 0, owner = 0, content = "") {
        path = this.resolvePath(path);
        const parts = this.parsePath(path);

        const filename = parts.pop();

        let current = this.root;

        for (const part of parts) {

            current = current.folders[part];

            if (!current)
                throw new Error("Folder not found.");

        }

        current.files[filename] =
            this.createFileObject(filename, size, owner, content);
    }


    deleteFile(path, userID = 0) {
        path = this.resolvePath(path);
        const parts = this.parsePath(path);

        const filename = parts.pop();

        let current = this.root;

        for (const part of parts) {

            current = current.folders[part];

            if (!current)
                return false;
        }

        const file = current.files[filename];

        if (!file)
            return false;

        this.requirePermission(file, userID, "delete");

        delete current.files[filename];

        return true;
    }

    //=====================================================
    // Directory Listing
    //=====================================================

    list(path = ".", userID = 0, showDetails = false) {

        path = this.resolvePath(path);

        const folder = this.getFolder(path);

        if (!folder) {
            return "Directory not found";
        }

        try {
            this.requirePermission(folder, userID, "read");
        } catch (err) {
            return err.message;
        }

        let output = [];

        output.push(`Directory of ${path}`);
        output.push("");

        // List folders
        for (const child of Object.values(folder.folders)) {

            let line = `<DIR> ${child.name}`;

            if (showDetails) {
                line += this.formatDetails(child, userID);
            }

            output.push(line);
        }

        // List files
        for (const file of Object.values(folder.files)) {

            let line = `${file.name}`;

            if (showDetails) {
                line += ` ${file.size} bytes`;
                line += this.formatDetails(file, userID);
            }

            output.push(line);
        }

        if (output.length === 2) {
            output.push("(empty)");
        }

        return output.join("\n");
    }

    //=====================================================
    // Serialization
    //=====================================================

    toJSON() {
        return JSON.stringify(this.root, null, 4);
    }

    fromJSON(json) {
        this.root = JSON.parse(json);
    }

    //=====================================================
    // Tree Printing
    //=====================================================

    print(folder = this.root, indent = "") {

        console.log(
            `${indent}${folder.name}/`
        );

        for (const child of Object.values(folder.folders)) {

            this.print(
                child,
                indent + "    "
            );

        }

        for (const file of Object.values(folder.files)) {

            console.log(
                `${indent}    ${file.name}`
            );

        }
    }

    // change directorys
    getCurrentDirectory() {
        return this.currentPath;
    }

    changeDirectory(path, userID = -1) {
        console.log(userID)
        const fullPath = this.resolvePath(path);

        const folder = this.getFolder(fullPath);

        if (!folder) {
            return "Directory not found";
        }
        console.log(!this.hasPermission(folder, userID, "execute"));
        if (!this.hasPermission(folder, userID, "execute")) {
            return "Access denied";
        }

        this.currentPath = fullPath;

        return this.currentPath;
    }


    resolvePath(path = ".") {

        // Normalize slashes
        path = path.replace(/\//g, "\\");

        // Root shortcut
        if (path === "\\" || path === "C:" || path === "C:\\") {
            return "C:\\";
        }

        let parts;

        // Absolute path
        if (path.startsWith("C:\\")) {

            parts = path
                .slice(3)
                .split("\\")
                .filter(Boolean);

        } else {

            // Start from current directory
            parts = this.currentPath
                .slice(3)
                .split("\\")
                .filter(Boolean);

            for (const part of path.split("\\")) {

                switch (part) {

                    case "":
                    case ".":
                        // Stay in current directory
                        break;

                    case "..":
                        // Go to parent if possible
                        if (parts.length > 0)
                            parts.pop();
                        break;

                    default:
                        parts.push(part);
                        break;
                }

            }

        }

        return "C:\\" + parts.join("\\");
    }

    formatDetails(item, userID) {

        const perms = item.permissions[userID] || {};

        const permissionString =
            [
                perms.read ? "R" : "-",
                perms.write ? "W" : "-",
                perms.delete ? "D" : "-",
                perms.execute ? "X" : "-"
            ].join("");

        const attributes =
            [
                item.attributes.readOnly ? "R" : "-",
                item.attributes.hidden ? "H" : "-",
                item.attributes.system ? "S" : "-",
                item.attributes.archive ? "A" : "-"
            ].join("");

        //return ` | Perms:${permissionString} | Attr:${attributes} | Owner:${item.owner}`;
        //console.log(nodes[player.nodeStack.length-1].accounts);
        let str = "unknown";
        let node = nodes[player.nodeStack.length-1];
        for (let n of node.accounts) {
            //console.log(`n.userId ${n.userId}, item.owner ${item.owner}`)
            if (n.userId == item.owner) {
                str = n.user;
            }
        }
        return ` ${permissionString}${attributes} ${str}`;
    }
}


//=========================================================
// Example Usage
/*/=========================================================

const fs = new FileSystem();

// Create folders
fs.createFolder("C:\\Games", 3);
fs.createFolder("C:\\Games\\DOOM", 1);
fs.createFolder("C:\\Windows", 2);
fs.createFolder("C:\\Windows\\System32", 2);

// Create files
fs.createFile("C:\\config.cfg", 1, "This is a config file");
fs.createFile("C:\\Games\\DOOM\\doom.exe", 1, "idiot");
fs.createFile("C:\\Games\\DOOM\\config.cfg", 1, "stupid");
fs.createFile("C:\\Windows\\System32\\kernel.dll", 2, "dumb");

// Give user 5 read-only access to DOOM
fs.grantPermissions(
    "C:\\Games\\DOOM",
    5,
    {
        read: true,
        execute: true
    }
);

// Give user 1 limited access
fs.grantPermissions(
    "C:\\Games",
    1,
    {
        read: true,
        write: true,
        delete: true,
        execute: false
    }
);

// Make Windows read-only
fs.setAttributes(
    "C:\\Windows",
    {
        readOnly: true,
        system: true
    }
);

console.log(fs.list("C:\\Games", 1));

console.log("\nFilesystem:\n");

fs.print();

//console.log("\nSerialized JSON:\n");

//console.log(fs.toJSON());

*/




/*
// ================================
// FileSystem Cheat Sheet
// ================================

// Create filesystem
const vfs = new FileSystem();


// ================================
// Navigation
// ================================

// Get current directory
vfs.getCurrentDirectory();
// "C:\\"


// Change directory
vfs.changeDirectory("C:\\Games");
vfs.changeDirectory("DOOM");
vfs.changeDirectory("..");
vfs.changeDirectory("\\");


// Resolve paths
vfs.resolvePath("DOOM\\MAPS");
// C:\Current\DOOM\MAPS


// Parse path
vfs.parsePath("C:\\Games\\DOOM");
// ["Games", "DOOM"]


// ================================
// Folders
// ================================

// Create folder
vfs.createFolder("C:\\Games", userID);


// Delete folder
vfs.deleteFolder("C:\\Games", userID);


// Get folder object
vfs.getFolder("C:\\Games");


// ================================
// Files
// ================================

// Create file
vfs.createFile(
    "C:\\Games\\DOOM\\doom.exe",
    2048000,       // size in bytes
    userID
);


// Delete file
vfs.deleteFile(
    "C:\\Games\\DOOM\\doom.exe",
    userID
);


// ================================
// Listing / Searching
// ================================

// List current directory
vfs.list();


// List with details
vfs.list(
    ".",
    userID,
    true
);


// Check if exists
vfs.exists("C:\\Games");


// Get file or folder object
vfs.getItem("C:\\Games\\DOOM");


// ================================
// Permissions
// ================================

// Check permission
vfs.hasPermission(
    "C:\\Games",
    userID,
    "read"
);


// Get all permissions
vfs.getPermissions(
    "C:\\Games",
    userID
);


// Display permissions
vfs.formatPermissions(
    "C:\\Games",
    userID
);
// RWDX


// Grant permissions
vfs.grantPermissions(
    "C:\\Games",
    userID,
    {
        read: true,
        write: true,
        delete: false,
        execute: true
    }
);


// Remove user permissions
vfs.revokeUser(
    "C:\\Games",
    userID
);


// ================================
// Attributes
// ================================

// Set DOS attributes
vfs.setAttributes(
    "C:\\Windows",
    {
        readOnly: true,
        hidden: true,
        system: true,
        archive: false
    }
);


// ================================
// Save / Load
// ================================

// Export filesystem
const json = vfs.toJSON();


// Load filesystem
vfs.fromJSON(json);


// Export raw object
const data = vfs.serialize();


// Load raw object
vfs.deserialize(data);


// ================================
// Display
// ================================

// Print filesystem tree
vfs.print();


// ================================
// Typical DOS Commands
// ================================

// DIR
vfs.list();


// CD
vfs.changeDirectory("Games");


// MD / MKDIR
vfs.createFolder("NewFolder", userID);


// RD
vfs.deleteFolder("OldFolder", userID);


// DEL
vfs.deleteFile("file.txt", userID);


// ATTRIB
vfs.setAttributes(
    "file.txt",
    {
        hidden:true
    }
);


*/