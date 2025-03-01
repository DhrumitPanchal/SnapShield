import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const oauthResponse = await GoogleSignin.signIn();
    // console.log(oauthResponse);
    const res = await axios.post(OAUTH, {
      provider: "google",
      id_token: oauthResponse?.data?.idToken,
    });

    console.log(res);
    // await handleSignInSuccess(res, dispatch);
  } catch (error) {
    // handleSignInError(error);    
    console.log(error.message);
  }
};
