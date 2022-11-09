export const initialState = {
  deployed: undefined,
  post: {
    environment: {
      vpc: "loading",
      routeTable: "loading",
      gateway: "loading",
      route: "loading",
      pubSub1: "loading",
      pubSub2: "loading",
      routeTableAssoc1: "loading",
      routeTableAssoc2: "loading",
    },
    service: {
      logGroup: "loading",
      albTargetGroup: "loading",
      taskRole: "loading",
      executionRole: "loading",
      taskDefinition: "loading",
      securityGroup: "loading",
      ecsCluster: "loading",
      albSecurityGroup: "loading",
      loadBalancer: "loading",
      albListener: "loading",
      ecsService: "loading"
    }
  }
}

export const reducer = (state, action) => {
  switch(action.type) {
    case "exists":
      let post = {environment: {}, service: {}}
      Object.keys(state.post.environment).forEach(key => {
        post.environment[key] = "check"
      })
      Object.keys(state.post.service).forEach(key => {
        post.service[key] = "check"
      })
      return {
        deployed: true,
        post
      }
    case "not yet created":
      post = {environment: {}, service: {}}
      Object.keys(state.post.environment).forEach(key => {
        post.environment[key] = "x"
      })
      Object.keys(state.post.service).forEach(key => {
        post.service[key] = "x"
      })
      return {
        deployed: false,
        post
      }
    case "deploy":
      return { post: initialState.post, deployed: true }
    case "destroy":
      return { post: initialState.post, deployed: false }
    case "vpc":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, vpc: action.payload} }}
    case "route table":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, routeTable: action.payload} }}
    default:
      return state
  }
}