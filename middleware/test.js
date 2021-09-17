exports.getRole = (req) => {
    fs.rmdirSync('public/video/'+req.body.name, { recursive: true });
    fs.rmdirSync('public/output/'+req.body.name, { recursive: true });
    fs.rmdirSync('public/uploads/'+req.body.name, { recursive: true });
}