import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get('google.clientID'),
      clientSecret: configService.get('google.clientSecret'),
      callbackURL: configService.get('google.callbackURL'),
      scope: ['profile', 'email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    let user = await this.usersService.findOne(profile.id);

    if (!user) {
      user = await this.usersService.create({
        id: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos?.[0]?.value || ''
      });
    }

    return user;
  }
}
