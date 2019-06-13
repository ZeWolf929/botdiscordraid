const Discord = require("discord.js")
const {Client, Attachment} = require("discord.js")
const client = new Discord.Client()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const ytdl = require('ytdl-core');
const bot = new Discord.Client({disableEveryone: true});
const categoryId = "569656234685235211";

const adapter = new FileSync('database.json');
const db = low(adapter);
bot.command = new Discord.Collection();

db.defaults({ histoires: [], xp:[]}).write()

let prefix = "k!"
let PREFIX = "k!"

client.login("NTY3MDA1OTY5ODU1MjgzMjMw.XMg2eQ.wtK52nRgOsY4OplNt0DHEvoGC2E");

client.on('ready', function() {
    client.user.setActivity(' ✴✴✴ Commande : k!help ✴✴✴ ')

    client.on('ready', () => console.log('✴✴✴ Robot démarré par un administrateur ! ✴✴✴ '));

})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('480380702349721602').sendMessage(embed)
    member.addRole('480385010096930816')
 
});
 
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
                .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('480380702349721602').sendMessage(embed)
 
});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande :x: ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.sendMessage("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.sendMessage("Je ne peux pas exclure cet utilisateur :x:")
       member.kick()
       message.channel.sendMessage("**"+member.user.username + '** a été exclu :white_check_mark:')
    }
});

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.sendMessage("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.sendMessage("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.sendMessage("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.sendMessage("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.sendMessage("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});


client.on('message',message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
   
    if (args[0].toLocaleLowerCase() === prefix + '8ball'){
        if (!args[0]) return message.channel.sendMessage("Veuillez **poser une question** :x:")
        let rep = ["Non :x:", "J'ai envie de dormir :zzz:", "Balec :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:", "Oui :white_check_mark:", "Ta gueule je m'en balec :x:", "Salle boloss", "Je ne sais pas"];
        let reptaille = Math.floor((Math.random() * rep.length));
        let question = args.slice(0).join(" ");
 
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
            .setColor("ORANGE")
            .addField("Question:", question)
            .addField("Réponse:", rep[reptaille]);
        message.channel.sendMessage(embed)
    }
})

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "purge") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.ssendMessage("Vous n'avez pas la permission d'utiliser cette commande :x:")
        let count = args[1]
        if (!count) return message.channel.sendMessage("Veuillez indiquer un nombre de messages à supprimer :x:")
        if (isNaN(count)) return message.channel.sendMessage("Veuillez indiquer un nombre valide :x:")
        if (count < 1 || count > 100) return message.channel.sendMessage("Veuillez indiquer un nombre entre 1 et 100 :x:")
        message.channel.bulkDelete(parseInt(count) + 1)
    }})

    client.on('message',message => {
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
       
        if (args[0].toLocaleLowerCase() === prefix + 'fs'){
            if (!args[0]) return message.channel.send("No permission")
            let rep = ["Fin de service !"];
            let reptaille = Math.floor((Math.random() * rep.length));
            let question = args.slice(0).join(" ");
     
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag)
                .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
                .setColor("DARK_BLUE")
                .setTimestamp()
                .addField("**Commande demandé**", question)
                .addField("**[R.A.I.D]**", rep[reptaille]);
            message.channel.sendMessage(embed)
        }
    })
    
    client.on('message',message => {
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
       
        if (args[0].toLocaleLowerCase() === prefix + 'ds'){
            if (!args[0]) return message.channel.send("No permission")
            let rep = ["Début de service !"];
            let reptaille = Math.floor((Math.random() * rep.length));
            let question = args.slice(0).join(" ");
     
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag)
                .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
                .setColor("DARK_BLUE")
                .setTimestamp()
                .addField("**Commande demandé**", question)
                .addField("**[R.A.I.D]**", rep[reptaille]);
            message.channel.sendMessage(embed)
        }
    })

    client.on('message',message => {
        var msgauthor = message.author.id;
    
        if(message.author.bot)return;
    
        if(!db.get("xp").find({user: msgauthor}).value()){
            db.get("xp").push({user: msgauthor, xp: 1}).write();
        }else{
            var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
            console.log(userxpdb);
            var userxp = Object.values(userxpdb)
            console.log(userxp)
            console.log(`Nombre d'xp: ${userxp[1]}`)
    
            db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();}
    
        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Statistique XP de ${message.author.username}`)
                .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
                .setColor('#F4D03F')
                .setDescription("Affichage des XP's")
                .addField("XP:", `${xpfinal[1]} xp`)
                .setFooter("Systeme d'XP par ZeWolf929")
            message.channel.sendMessage({embed: xp_embed})};
    
    });

    client.on('message',message => {
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
       
        if (args[0].toLocaleLowerCase() === prefix + 'help'){
            if (!args[0]) return message.channel.send("No permission")
            let rep = ["Début de service !"];
            let reptaille = Math.floor((Math.random() * rep.length));
            let question = args.slice(0).join(" ");
     
            let embed = new Discord.RichEmbed()
                .setThumbnail("https://cdn.discordapp.com/attachments/504383898361397249/512351625025814549/Logo_RAID.svg.png")
                .setColor("DARK_BLUE")
                .setTimestamp()
                .setTitle("**Informations du robots** :gear:")
                .addField("**Commande Joueurs:**", "k!punch/2/3/4, k!learn/2/3/4, k!xp, k!fs, k!ds, k!8ball, k!danse, k!loved, k!octogone, k!pileorface, k!regles, k!serverinfo")
                .addField("**Commande Administrateurs:**", "k!mute, k!unmute, k!purge, k!kick, k!ban");
            message.channel.sendMessage(embed)
        }
    })

    client.on('message', message=>{

        let args = message.content.substring(PREFIX.length).split(" ");
    
        switch(args[0]){
            case 'danse':
                let = attachment = new Attachment("https://media.giphy.com/media/GFamofJHhruow/giphy.gif")
                message.channel.sendMessage("**DANSE :dancers: **", attachment);
            break;
        }
    })

    client.on('message',message => {
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
       
        if (args[0].toLocaleLowerCase() === prefix + 'loved'){
            if (!args[0]) return message.channel.sendMessage("Veuillez **poser une question** :x:")
            let rep = ["Affinité : [▉▉▉▉▉▉▉▉▉▉ 100%] :heart:", "Affinité : [▉▉▉▉▉▉▉▉▉  90%] :heart:", "Affinité : [▉▉▉▉▉▉▉▉   80%] :heart:", "Affinité : [▉▉▉▉▉▉▉    70%] :heart:", "Affinité : [▉▉▉▉▉▉     60%] :heart:", "Affinité : [▉▉▉▉▉      50%] :heart:", "Affinité : [▉▉▉▉       40%] :heart:", "Affinité : [▉▉▉        30%] :heart:", "Affinité : [▉▉         20%] :heart:", "Affinité : [▉          10%] :heart:", "Affinité : [            0%] :broken_heart:"];
            let reptaille = Math.floor((Math.random() * rep.length));
            let question = args.slice(0).join(" ");
     
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag)
                .setThumbnail("https://clipart.info/images/ccovers/1518056310Emoji-heart-Png.png")
                .setColor("#ff00fe")
                .setTimestamp()
                .addField("**Test d'Affinité**", question)
                .addField("**Résultat **", rep[reptaille])
                .setFooter("Merci de spécifier avec une mention les deux personnes concerner pour ce test.")
            message.channel.sendMessage(embed)
        }})

        client.on('message',message => {
            if (!message.guild) return
            let args = message.content.trim().split(/ +/g)
         
           
        if (message.content === prefix + 'octogone'){
            if (!args[0]) return message.channel.sendMessage("Veuillez **poser une question** :x:")
            let rep = ["Kama remporte le duel honte à toi qui a défier Kama ! :skull_crossbones: ", "Combat nul, personne ne gagne... :o:", "Tu gagne le duel contre Kama. Félicitations. :tada:"];
            let reptaille = Math.floor((Math.random() * rep.length));
     
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag)
                .setThumbnail("http://state-of-rp.tekao.fr/image/71bcf0138b.png")
                .setColor("#570303")
                .setTimestamp()
                .setImage("http://state-of-rp.tekao.fr/image/Octogone.png")
                .addField("**Résultat **", rep[reptaille])
                .setFooter("Idée by _Roro_ merci a lui.")
            message.channel.sendMessage(embed)
        }})

        client.on('message',message => {
            if (!message.guild) return
            let args = message.content.trim().split(/ +/g)
         
            if (args[0].toLocaleLowerCase() === prefix + 'pileorface'){
                if (!args[0]) return message.channel.sendMessage("Veuillez **poser une question** :x:")
                let rep = ["Pile !", "Face !", "Pile !", "Face !", "Pile !", "Face !"];
                let reptaille = Math.floor((Math.random() * rep.length));
                let question = args.slice(0).join(" ");
         
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag)
                    .setThumbnail("http://recueil-de-png.r.e.pic.centerblog.net/6a4716a3.png")
                    .setColor("#ff00fe")
                    .setTimestamp()
                    .addField("**Choix :**", question)
                    .addField("**Résultat **", rep[reptaille])
                    .setFooter("Idée by _Roro_ merci a lui. Veuillez spécifier votre choix.")
                message.channel.sendMessage(embed)
            }})

            client.on('message', message => {

                if(message.content === prefix + "serverinfo"){

                    let sicon = message.guild.displayAvatarURL
                    let serverembed = new Discord.RichEmbed()
                    .setDescription("Informations du serveur :gear:")
                    .setColor("PURPLE")
                    .setThumbnail(sicon)
                    .addField("Nom du serveur :", message.guild.name)
                    .addField("Créer le :", message.guild.createdAt)
                    .addField("Tu as rejoins le serveur le :", message.member.joinedAt)
                    .addField("Membre total :", message.guild.memberCount);

                    return message.channel.sendMessage(serverembed)
                }})



