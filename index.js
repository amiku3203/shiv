const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

// mongoose.connect('mongodb+srv://biztoindia5:LkoskQrKJeTRxhiH@cluster0.mafatxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//    );

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const formSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   mobile: String,
//   message: String,
// });

// const FormData = mongoose.model('FormData', formSchema);

// const formDataSchema = new mongoose.Schema({
//   name: String,
//   contact: String,
//   message: String,
// });

// const NewFormData = mongoose.model('NewFormData', formDataSchema);

const transporter1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lozanosales8@gmail.com',
    pass: 'cbsn fded hqgw dklv',
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, mobile, message } = req.body;

  // const formData = new FormData({ name, email, mobile, message });
  
    // await formData.save();
    // console.log('Form data saved to MongoDB');

    const mailOptions1 = {
      from: 'lozanosales8@gmail.com',
      to: [email, 'lozanosales8@gmail.com'],
      subject: 'New Form Submission',
      text: `Successfully Registered\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    };

   try {
  const info = await transporter1.sendMail(mailOptions1);
  console.log('Email sent:', info.response);
  res.status(200).send('Form data saved and emails sent successfully');
} catch (error) {
  console.error('Error sending email:', error);
  res.status(500).send('Error sending email');
}

   
})

app.post('/send-email2', async (req, res) => {
  const { name, contact, message } = req.body;
  console.log(name, contact, message);

  // const formData = new NewFormData({ name, contact, message });
  try {
    // await formData.save();
    console.log('Form data saved to MongoDB');

    const mailOptions = {
      from: 'lozanosales8@gmail.com',
      to: 'lozanosales8@gmail.com',
      subject: 'New Form Submission',
      text: `Query Sent\nName: ${name}\nMobile: ${contact}\nMessage: ${message}`,
    };

  await  transporter1.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Query Sent Successfully');
      }
    });
  } catch (error) {
    console.error('Error saving form data or sending email:', error);
    res.status(500).send('Error saving form data or sending email');
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log('Error in connecting server', err);
  } else {
    console.log('Successfully connected on port', port);
  }
});
