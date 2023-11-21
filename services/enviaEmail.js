
var nodemailer = require('nodemailer');



module.exports = async function enviaEmail(email, texto, titulo){
    




        var envia = await nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false, // upgrade later with STARTTLS
                    auth: {
                    user: "flow@tripletech.com.br",
                    pass: "Taj01839",
                    }});

                    var emailASerEnviado = {
                    from: "flow@tripletech.com.br",
                    to: email,
                    subject: titulo,
                    html: texto,

                    };



                    await envia.sendMail(emailASerEnviado, function(error){
                    if (error) {
                    console.log(error);

                    } else {

                    console.log("emamil enviado com sucesso");
            }

        });



}