import { registerAs } from "@nestjs/config";

export default registerAs('notifications', () => ({
  senderEmail: process.env.SENDER_EMAIL,
  smsGateway: process.env.SMS_GATEWAY,
}))