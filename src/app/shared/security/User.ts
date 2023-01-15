/**
 * Interface com a representação de 'Usuário'.
 *
 * @author Guiliano Rangel (UEG)
 */
export interface User {
  id: number;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  mnemonico?: string;
  roles?: string[];
}
