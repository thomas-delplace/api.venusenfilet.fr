const express = require('express')
const nodemailer = require('nodemailer')
const routes = express.Router()

////////////////////////////////////////////////// POST
routes.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    console.log("Headers:", req.headers)
    console.log("Body:", req.body)
    next()
})

routes.post('/necklace', (req,res)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.SENDER_HOST,
        port:process.env.SENDER_PORT,
        secure:false,
        requireTLS:process.env.SENDER_TLS,
        auth:{
            user:process.env.SENDER_EMAIL,
            pass:process.env.SENDER_PASS
        }
    })
    const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to:process.env.RECEIVER_EMAIL,
        subject:'Commande de collier personnalisé',
        text:`Tu viens de recevoir une demande de ${req.body.client.mail} (${req.body.client.firstName} ${req.body.client.lastName}) pour un collier personnalisé. \n\n Chaine ${req.body.necklace.chain}, \n ${req.body.necklace.beads}, \n message : ${req.body.necklace.message}`
    }
    transporter.sendMail(mailOptions, (error,info)=>{
        if(error){
            res.status(500).json({message:"Oops, une erreur s'est produite. Veuillez réessayer."})
        }else{
            res.status(200).json({message:"La commande a bien été transmise."})
        }
    })
})

routes.post('/on',(req,res)=>{
    res.status(200).json({message:"okay"})
})
module.exports = routes
