
export default async ({ error, query, redirect, $service, store }: any) => {
  const hasCallback = query.callback ?? store.getters.getFeedback;
  const isAuthenticated = await $service.auth.isAuthenticated();
  if (isAuthenticated && hasCallback) {
    $service.auth.redirectToOrigin();
  } else if (isAuthenticated) {
    error({ statusCode: 400 })
  }
}