import { Injectable } from "@nestjs/common";
import { appendFile } from  'node:fs'
import { ConfigService } from "@nestjs/config";
import { styleText } from 'node:util';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService) {}

  sendEmail(to: string, subject: string, message: string): void {
    // logs optional SENDER_EMAIL param
    console.log(styleText('magentaBright', `Email sender: ${this.configService.get('notifications.senderEmail')}`));

    const logMessage = `Email sent to ${to}: [${subject}] ${message}`
    console.log(logMessage)
    appendFile('./messages.txt', '[NOTIFICATION]: ' + logMessage + '\n', (err) => {
      if (err) console.error(err)
    })
  }
  sendSMS(to: string, message: string): void {
    // logs optional SMS_GATEWAY param
    console.log(styleText('blueBright', `SMS gateway: ${this.configService.get('notifications.smsGateway')}`));

    const logMessage = `SMS sent to ${to}: ${message}`
    console.log(logMessage)
    appendFile('./messages.txt', '[NOTIFICATION]: ' + logMessage + '\n', (err) => {
      if (err) console.error(err)
    })
  }
}
