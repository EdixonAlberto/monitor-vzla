type TCtx = import('telegraf').Context

interface MyContext extends TCtx {
  myProp?: string
  myOtherProp?: number
}
