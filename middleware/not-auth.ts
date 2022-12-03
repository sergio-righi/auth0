
export default async ({ error, query, redirect, $service, store }: any) => {
  const hasCallback = query.callback ?? store.getters.getCallback
  const isAuthenticated = await $service.auth.isAuthenticated()
  if (isAuthenticated && hasCallback) {
    return redirect(hasCallback)
  } else if (isAuthenticated) {
    error({ statusCode: 400 })
  }
}