import { environment } from '../../environments/environment';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(environment.sgMail);
export default sgMail;