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

  const className = action.payload ? "check" : "x";

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
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, vpc: className} }}
    case "route table":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, routeTable: className} }}
    case "gateway":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, gateway: className} }}
    case "route":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, route: className} }}
    case "public subnet 1":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, pubSub1: className} }}
    case "public subnet 2":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, pubSub2: className} }}
    case "route table association 1":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, routeTableAssoc1: className} }}
    case "route table association 2":
      return { ...state, post: { ...state.post, environment: { ...state.post.environment, routeTableAssoc2: className} }}
    case "log group":
      return { ...state, post: { ...state.post, service: { ...state.post.service, logGroup: className} }}
    case "alb target group":
      return { ...state, post: { ...state.post, service: { ...state.post.service, albTargetGroup: className} }}
    case "task role":
      return { ...state, post: { ...state.post, service: { ...state.post.service, taskRole: className} }}
    case "execution role":
      return { ...state, post: { ...state.post, service: { ...state.post.service, executionRole: className} }}
    case "task definition":
      return { ...state, post: { ...state.post, service: { ...state.post.service, taskDefinition: className} }}
    case "security group":
      return { ...state, post: { ...state.post, service: { ...state.post.service, securityGroup: className} }}
    case "alb security group":
      return { ...state, post: { ...state.post, service: { ...state.post.service, albSecurityGroup: className} }}
    case "ecs cluster":
      return { ...state, post: { ...state.post, service: { ...state.post.service, ecsCluster: className} }}
    case "load balancer":
      return { ...state, post: { ...state.post, service: { ...state.post.service, loadBalancer: className} }}
    case "alb listener":
      return { ...state, post: { ...state.post, service: { ...state.post.service, albListener: className} }}
    case "ecs service":
        return { ...state, post: { ...state.post, service: { ...state.post.service, ecsService: className} }}
    default:
      return state
  }
}