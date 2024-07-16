'use server';

export async function postFcmToken(fcmToken: string, token: string) {
  fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v2/fcm?fcm_token=${fcmToken}&token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      return result.json;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
