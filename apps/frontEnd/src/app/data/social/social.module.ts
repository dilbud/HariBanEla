import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@env';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleClientKey)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookClientKey)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialLoginModule,
  ],
  exports: [
    SocialLoginModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class SocialModule { }
