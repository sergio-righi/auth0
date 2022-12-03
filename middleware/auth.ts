
export default async ({ error, query, $service }: any) => {
  const hasCallback = query.callback;
  const isAuthenticated = await $service.auth.isAuthenticated();
  if (!isAuthenticated && hasCallback) {
    alert('here');
    $service.auth.redirectToOrigin();
  } else if (!isAuthenticated) {
    error({ statusCode: 400 })
  }
}