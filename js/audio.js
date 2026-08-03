const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();

function playTone(digit, dur) {
    const frequencies = {
        '1': [697, 1209],
        '2': [697, 1336],
        '3': [697, 1477],
        '4': [770, 1209],
        '5': [770, 1336],
        '6': [770, 1477],
        '7': [852, 1209],
        '8': [852, 1336],
        '9': [852, 1477],
        '*': [941, 1209],
        '0': [941, 1336],
        '#': [941, 1477],
        'A': [697, 1633],
        'B': [770, 1633],
        'C': [852, 1633],
        'D': [941, 1633]
    };

    const [freq1, freq2] = frequencies[digit];

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();

    osc1.frequency.value = freq1;
    osc2.frequency.value = freq2;

    osc1.connect(audioContext.destination);
    osc2.connect(audioContext.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioContext.currentTime + dur);
    osc2.stop(audioContext.currentTime + dur);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function setAudioSource(url, array = phoneAudio) {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = url;
    audio.load();

    const source = audioContext.createMediaElementSource(audio);

    source.connect(audioContext.destination);

    array.push({
        audio,
        source
    });

    console.log(audio)
    console.log(audio.play());
    return audio;
}

/*/function setAudioSource(path, array = phoneAudio) {
    // Create a new buffer source
    console.log("path: " + path);
    const source = audioContext.createBufferSource();
    array.push(source);

    // Load audio data
    fetch(path)
        //.then(response => response.arrayBuffer())
        .then(response => {
            console.log(response.status, response.statusText);
            if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
            }
            return response.arrayBuffer();
        })
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            source.buffer = buffer; // Set the buffer to the source
            source.connect(audioContext.destination); // Connect to the destination
            source.start(0); // Play the audio
            source.addEventListener("ended", (e) => {
                if (player.musicOn && array == backgroundMusic) {
                    playMusic();
                }
                console.log(`Audio has finished playing. array is ${array}`);
            });
        })
        .catch(error => console.error('Error loading audio:', error));
}*/

function playMusic(window, url="", s="") {
    //console.log("playMusic url: " + url);
    //let path = `./sfx/music/stub.mp3`;
    let sources = [];
    if (s == "") {
        sources.push("https://archive.org/download/raveforce1-jungle-breakcore/Dmachine%20-%20Condiments%20of%20the%20Darkside.%20Jungle%20%26%20Breakcore%20Mix%20Heavy%20Amen%20subwoofer%20excurison-yVLXI-m70lQ.mp3");
        sources.push("https://archive.org/download/raveforce1-jungle-breakcore/%5B%20JUNGLE_BREAKCORE%20%5D%20_%20JAMIN%20NIMJAH%20_%20ERROR404%20VISUAL%20MIX%20_%20002-kyXx-nGxqpQ.mp3");
        sources.push("https://archive.org/download/raveforce1-jungle-breakcore/%5BMachineKool%5D%202%20Hour%20Dark%20DnB%20to%20Jungle%20%2C%20Breakcore%20Mix%20%5BMachinekool%5D%202014%202hr-Xj9Hvmspej8.mp3");
        sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20Exodia%20-%20Valkyria-fd6ZF1UJ9oM.mp3");
        sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20isyti%20-%20bootleg-AURcBIKXRX0.mp3");
        sources.push("https://archive.org/download/raveforce1-sextrancemix/%5B2022%5D%20sienna%20sleep%20-%20live%20dj%20set%20for%20sextrance%20worldwide-zdQgbjgucwI.mp3");
        sources.push("https://archive.org/download/selected-dnb-1/Inner-Vation%20-%20Movements%20%281999%29-DU3Rezgt-TE.mp3");
        sources.push("https://archive.org/download/selected-dnb-1/Intelligent%20Drum%20%26%20Bass%20-%20Selected%20Works%20%281994-2000%29-1zGaTE2AmsU.mp3");
        sources.push("https://archive.org/download/selected-dnb-1/Jungle%20Mix%20-%20psiX%20-%20Room%2099-lfcehfutGBM.mp3");
        sources.push("https://archive.org/download/selected-dnb-1/Peshay%20Studio%20Set%20%281996%29-JK8ilaPZbKE.mp3");
        sources.push("https://archive.org/download/NinjaGaijinStaringIntoTheEyesOfDeathBREAKCORE15Feb2014/Ninja_Gaijin_-_Staring_Into_The_Eyes_Of_Death_%28BREAKCORE-15Feb2014%29.mp3");
        sources.push("https://archive.org/download/NinjaGaijinGuardiansOfSunshineJUNGLE27May2014/Ninja_Gaijin_-_Guardians_of_Sunshine_%28JUNGLE-27May2014%29.mp3");
        sources.push("https://archive.org/download/NinjaGaijinTheLegacyofthe47RoninJUNGLE/Ninja%20Gaijin%20-%20The%20Legacy%20of%20the%2047%20Ronin%20%28JUNGLE-10Nov2014%29.mp3");
        sources.push("https://archive.org/download/NinjaGaijin-TheChokeholddarkstepMix10july11/Ninja_Gaijin_-_The_Chokehold_10July2011-DARKSTEP-320.mp3");
        sources.push("https://archive.org/download/NinjaGaijinBlackBokorJUNGLE25Apr2015/Ninja%20Gaijin%20-%20Black%20Bokor%20%28JUNGLE-25Apr2015%29.mp3");
        sources.push("https://archive.org/download/rumbus-fuck-glamour-dn-b-mix/Rumbus%20-%20Fuck%20Glamour%20DnB%20Mix.mp3");
        sources.push("https://archive.org/download/rf1-jumpstylemix-1/%F0%9D%94%87%F0%9D%94%8D%206YR%E0%B0%A5%E0%B1%8D%E2%80%8C%D9%A3%D9%A3A%20%D0%97%D0%90%D0%9E%20%26%20Y%20A%20B%20H%20I%20E%20L%20-%20JUMPSTYLE%20CRAZYMIX%20VOL.01%20%5BKgpuXb6vDvk%5D.mp3");
        sources.push("https://archive.org/download/CriteriaForFailureLiveMixAtKuznetskiyMost/Criteria%20For%20Failure%20-%20%20Live%20mix%20at%20Kuznetskiy%20Most.mp3");
        sources.push("https://archive.org/download/dj-combo-ragga-jungle-bass-action-1/DJ%20Combo%20-%20Ragga%20Jungle%20Bass%20Action%201.mp3");
        sources.push("https://archive.org/download/rumbus-fuck-glamour-dn-b-mix/Rumbus%20-%20Fuck%20Glamour%20DnB%20Mix.mp3");
        sources.push("https://archive.org/download/Sinapz-liquidLightMix3/LiquidLight3.mp3");
        sources.push("https://archive.org/download/1757030366_windowlicker/Windowlicker/01%20Aphex%20Twin%20-%20Windowlicker.mp3");
        sources.push("https://archive.org/download/Squarepusher19970724JapanTokyo/Squarepusher%20-%201997-07-24%20Japan-Tokyo.mp3");
        sources.push("https://archive.org/download/Squarepusher19970724JapanTokyo/Squarepusher%20-%201997-07-24%20Japan-Tokyo.mp3");
        sources.push("https://archive.org/download/obliviongrimes/03-Oblivion.mp3");
    } else if (s == "talk") {
        // defcon 2000
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V01-Arthur_Money-Meet_The_Fed_Panel-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V03-Noise-Anonymous_Remailser_The_Importance_of_Widley_Availabel_Anonymity_in_an_Age_of_Big_Brother-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V05-Jennifer_Granick-The_Law_and_Hacking-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V06-John_Q_Newman-10_Steps_You_Can_Take_to_Protect_Your_Privacy-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V07-Syke-Opensource_Utilities_and_How_to_Use_Them_to_Test_IDSes_and_Firewalls-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V08-Jason_Scott-TEXTFILESDOTCON_One_Year_Later-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V09-Jeru-Advanced_Evasion_of_IDS_Buffer_Overflow_Detection-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V11-Gregory-B-White_The_USAFA_cadet_Hacking_Case-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V12-Tim_Lawless-Saint_Jude_Modeling_Detecting_and_Responding_to_Unauthorized_Root_Transitions-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V13-Thomas_Munn-The_Need_For_Home_Based_Firewalls-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V14-Ron_Moritz-Proactive_Defense_Against_Malicious_Code-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V15-Robert_Graham-Evading_Network_Based_Intrusion_Detection_Systems-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V16-Xs-LDAP-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V17-D-Krypt-Web_Application_Security-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V19-V1ru5-More_Lock_Picking-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V20-Bruce_Schneir-Session-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V21-Ian_Vitek-Configuring_Linux_2_for_IP_Spoofing_and_Source_Routing-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V22-MR_Nasty-Using_Tools_to_Obtain_Recon_on_NT_Networks-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V24-Bennett_Haselton-A_Protocol_That_Uses_Steganography_to_Circumvent_Network_Level_Censorship-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V25-Legal_Panel_Discussion-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V26-David_J_DiCenso-The_Citizen_Hacker_Patriot_or_War_Criminal-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V27-Greg_Hoglund-Advanced_Buffer_Overflow_Techniques-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V28-Mike_Scher-What_is_DNS-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V29-Ian_Goldberg-Using_The_Internet_Pseudonymously_3_Its_Alive-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V30-Ghandi-Dotcom_Smashing_Buffer_Overflows_on_the_SPARC-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V31-DDT-What_PGP_and_Crypo_is_and_How_to_use_it-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V35-Ender-Demonstration_and_Presentation_of_the_Autonomous_Nodes-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V36-Evil_Wrangler-Building_Backdoor_Binary_Featuring_SSH_2-0-13-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V37-Jim_McCoy-Building_the_Mojo_Nation-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V38-Aaron_Grothe-Tunneling_and_Firewalls-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V39-Chris_Goggans-Lotus_Domino_Vulerabilities-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V40-Freaky-Macintosh_Security-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V42-Adam_Bresson-Palm_Data_Protection-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V43-Pyr0-FAQ_The_Kiddies-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V44-Phillip_J_Loranger-Army_Biometrics-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V45-Phil_King-8-bit_Redux_Microcntroller_Hacking-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V47-Simple_Nomad-A_How_to_Regarding_Network_Mapping-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V48-John_S_Flowers-Network_IDS_Do_Not_Fold_Spindle_or_Mutilate-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V49-V1ru5-Updated_Computer_Virus_Class-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V50-Richard_Thieme-Social_Engineering_at_Defcon_Games_Hackers_Play-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V51-Blanu-Freenet-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V52-Daremoe-System_Profiling_Target_Analysis_or_How_Crackers_Find_You-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V53-Sarah_Gordon-Virus_Writers_The_End_Of_Innocence-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V54-Kent_Radek-Puzzlenet_Designing_an_Anonymous_Network-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_Defcon_V55_Natasha_Grigori-Hacktivist_to_Activsts_Making_the_Transition-audio.mp3");
        sources.push("https://archive.org/download/defcon-real-media-collection/2000_defcon_V32-John_Q_Newman-Fake_ID_by_Mail_and_Modem-audio.mp3");
        // ccc 1999
        sources.push("https://archive.org/download/1999-ccc-congress-audio/jahresrueckblick.mp3")
        sources.push("https://archive.org/download/1999-ccc-congress-audio/teslaspulen_vortrag.wav.mp3");
        sources.push("https://archive.org/download/1999-ccc-congress-audio/tron.mp3");
        // 2600
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000704-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000627-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000620-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000613-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000606-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000530-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000523-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000509-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000502-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000425-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000418-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000411-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000404-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000328-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000321-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000314-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000307-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000229-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000222-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000215-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000208-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000201-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000111-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/off_the_hook__20000104-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/2000/fill-in__20000101-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991228-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991221-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991214-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991207-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991130-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991123-128.mp3");
        sources.push("https://www.2600.com/offthehook/mp3files/1999/off_the_hook__19991116-128.mp3");



    }

    let r;
    if (url == "") {
        r = getRandInt(sources.length-1);
        window.setText("Buffering audio... " + sources[r]);
        if (s == "talk") {
            setAudioSource(sources[r], talkRadio);
        } else {
            setAudioSource(sources[r], backgroundMusic);
        }
    } else {
        window.setText("Buffering audio url... " + url);
        if (!sources.includes(url)) {
            window.setText("Added URL to playlist. Buffering audio... " + url);
            sources.push(url);
        } else {
            window.setText("Buffering audio url... " + url);
        }
        setAudioSource(url, backgroundMusic);
    }
    
    gainNode.gain.value = 0.1; // setting it to 10%
    //gainNode.connect(backgroundMusic);
    return r;
}
 
async function playDTMF(sequence, toneDuration = 0.06, gap = 0.02) {
    await audioContext.resume();

    for (const digit of sequence) {
        if (digit == "h") {
            while (phoneAudio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
            }
            setAudioSource(phoneAudio[0], phoneAudio);
        } else if (digit == "r") {
            while (phoneAudio.length > 1) {
                //console.log(audio[audio.length - 1])
                phoneAudio[phoneAudio.length - 1].stop();
                phoneAudio.pop();
            }
            setAudioSource(`./sfx/phone/ring.mp3`, phoneAudio);
            await sleep(getRandInt(3000) + 1500);
        } else {
            playTone(digit, toneDuration);
            await sleep((toneDuration + gap) * 1000);
        }
    }
}

