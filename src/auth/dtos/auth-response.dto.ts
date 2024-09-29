export class AuthResponseDto {
  message: string;
  data: {
    user: {
      _id: string;
      name?: string;
      email?: string;
    };
    accessToken?: string;
  };
}
