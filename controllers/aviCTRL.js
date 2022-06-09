const fs = require('fs')
const { exec } = require('child_process');

const mailgun = require("mailgun-js");
const download = require('download');

exports.avi = (req,res, next) => {

    let list = ""

    const emailCorrection = req.body.emailCorrection

    console.log(emailCorrection)

    let directoryPath = `public/uploads/${req.body.idUser}`
    let directoryPathVideo = `public/video/${req.body.idUser}/`
    let directoryPathFinal = `public/output/${req.body.idUser}/`

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


    req.files.files.forEach( (file, index) => {

        file.mv(`${directoryPath+'/'+file.name}.webm`, err => {})

     })

        const promise1 = new Promise((resolve, reject) => {

            fs.readdir(directoryPath, function (err, files) {

                for (i = 1; i < (files.length - 1); i++) {

                    exec(`ffmpeg -i ${'public/videoSource/'+req.params.id+'/'+`${i}`+'.webm'} -i ${directoryPath+'/webCam'+i+'.webm'} -filter_complex "[0:v]scale=20:10,setsar=1[l];[1:v]scale=20:10,setsar=1[r];[l][r]hstack;[0][1]amix" -async 0  ${directoryPathVideo+'/webCam'+i+'.webm'} `, (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                        }
                        else{
                            resolve("Resolve")
                        }
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

                        const file = 'test.webm';
                        // Path at which image will get downloaded
                        const filePath = `${directoryPathFinal+'finalOutput.webm'}`;
                        
                        download(file,filePath)
                        .then(() => {
                            console.log('Download Completed');
                        })

                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'test.benjamin.creniaut@gmail.com',
                                pass: 'testBenjamin123!'
                            }
                            });
                            
                        const mailOptions = {
                            from: 'test.benjamin.creniaut@gmail.com',
                            to: 'creniaut.benjamin@gmail.com',
                            subject: 'Sending Email using Node.js',
                            text: 'That was easy!',
                            attachments: [
                                    {   // utf-8 string as an attachment
                                        filename: 'video.webm',
                                        content: `${directoryPathFinal+'finalOutput.webm'}`,
                                    },
                                ]
                            };
                        
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            fs.rmSync(`public/video/${req.body.idUser}`, { recursive: true });
                            fs.rmSync(`public/output/${req.body.idUser}`, { recursive: true });
                            fs.rmSync(`public/uploads/${req.body.idUser}`, { recursive: true });
                        }
                        });
                    }
                })
            })
    }
)}
