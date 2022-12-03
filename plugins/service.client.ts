import { initializeService } from "@/services";

const service: any = (context: any, inject: any) => {
  inject('service', initializeService(context))
}

export default service