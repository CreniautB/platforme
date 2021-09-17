const fs = require('fs')
const { exec } = require('child_process');

const mailgun = require("mailgun-js");


exports.anion = (req,res, next) => {

    console.log(req.files)
    let list = ""

    let directoryPath = `public/anion/uploads/${req.body.idUser}`
    let directoryPathVideo = `public/anion/video/${req.body.idUser}/`
    let directoryPathFinal = `public/anion/output/${req.body.idUser}/`

    let listFilePath = directoryPathVideo + 'list.txt'

    fs.mkdir(directoryPath, function(err) {
        if (err) {
            console.log(err)
        }})

    fs.mkdir(directoryPathVideo, function(err) {
        if (err) {
            console.log(err)
        }})

    fs.mkdir(directoryPathFinal, function(err) {
        if (err) {
            console.log(err)
        }})


    req.files.files.forEach(file => {
        file.mv(`${directoryPath+'/'+file.name}.webm`, err => {})
     })

        const promise1 = new Promise((resolve, reject) => {

            fs.readdir(directoryPath, function (err, files) {

                for (i = 1; i < (files.length - 1); i++) {

                    exec(`ffmpeg -i ${'public/videoSourceAnion/'+req.params.id+'/'+`${i}`+'.webm'} -i ${directoryPath+'/webCam'+i+'.webm'} -filter_complex "[0:v]scale=10:5,setsar=1[l];[1:v]scale=10:5,setsar=1[r];[l][r]hstack;[0][1]amix" -async 0  ${directoryPathVideo+'/webCam'+i+'.webm'} `, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                        }
                        else{resolve("Resolve")}
                    })
                }   
            })
        })

    
        promise1.then(() => { 
            const promise2 = new Promise((resolve, reject) => {

            fs.readdir(directoryPath, function (err, files) {
                for ( let i = 1; i < files.length +1 ; i++) {
                    list += `file webcam${i}.webm`
                    list += "\n"
                }
                      
                fs.writeFile(listFilePath, list, (err) => {
                    if (err) throw err;
                    console.log('File saved!');
                });
            })
                  
            resolve('resolve')
            })

            promise2.then(() => {
                
                exec(`ffmpeg -safe 0 -f concat -i ${listFilePath}  ${directoryPathFinal+'finalOutput.webm'}`, (error, stdout, stderr) => {
            
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                else{
                    res.download(`${directoryPathFinal+'finalOutput.webm'}` ,(err) => {
                        if(err) throw err

                        const DOMAIN = "sandbox0a9deb84a69f456f95a3ccfc7cb0cec2.mailgun.org";
                        const mg = mailgun({apiKey: "eb86d0963b570e22bf09bf6eb88c6130-90346a2d-fc6d1071", domain: DOMAIN});
                        const data = {
                            from: "Mailgun Sandbox <postmaster@sandbox0a9deb84a69f456f95a3ccfc7cb0cec2.mailgun.org>",
                            to: "creniaut.benjamin@gmail.com",
                            subject: "Hello",
                            text: "Testing some Mailgun awesomness!",
                            attachment : `${directoryPathFinal+'finalOutput.webm'}`
                        };
                        mg.messages().send(data, function (error, body) {
                            if (error) {console.log(error)}
                            else{
                                fs.rmSync(`public/anion/video/${req.body.idUser}`, { recursive: true });
                                fs.rmSync(`public/anion/output/${req.body.idUser}`, { recursive: true });
                                fs.rmSync(`public/anion/uploads/${req.body.idUser}`, { recursive: true });
                                console.log("message send")
                            }
                        });
                        })                

                    }
                })
            })
    }
)}
