import EventSource from 'eventsource';

export const streamTfData = async (path, action, setBool) => {
  const response = await fetch('http://localhost:3005/aws/services');
  const { envName } = await response.json();

  const source = new EventSource(`http://localhost:3005/terraform/${path}`); // GET request?

  source.onmessage = event => {
    console.log("received event");

    // env stack
    if (event.data.includes(`(cs-${envName}-vpc): ${action} complete`)) {
     dispatch({type: "vpc", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-table): ${action} complete`)) {
      dispatch({type: "route table", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-internet-gateway): ${action} complete`)) {
      dispatch({type: "gateway", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-route): ${action} complete`)) {
      dispatch({type: "route", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-public-1): ${action} complete`)) {
      dispatch({type: "public subnet 1", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-public-2): ${action} complete`)) {
       dispatch({type: "public subnet 2", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-sub-assoc-1): ${action} complete`)) {
      dispatch({type: "route table association 1", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-sub-assoc-2): ${action} complete`)) {
      dispatch({type: "route table association 2", payload: setBool})
    }
    // service stack
      else if (event.data.includes(`(ecs--cs-${envName}-loggroup): ${action} complete`)) {
      dispatch({type: "log group", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-target-group): ${action} complete`)) {
      dispatch({type: "alb target group", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-task-role): ${action} complete`)) {
      dispatch({type: "task role", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-execution-role): ${action} complete`)) {
      dispatch({type: "execution role", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-task-definition): ${action} complete`)) {
      dispatch({type: "task definition", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-security-group): ${action} complete`)) {
      dispatch({type: "security group", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-alb-security-group): ${action} complete`)) {
      dispatch({type: "alb security group", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-cluster): ${action} complete`)) {
      dispatch({type: "ecs cluster", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-lb): ${action} complete`)) {
      setLoadBalancer(setBool)
      dispatch({type: "load balancer", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-alb-listener): ${action} complete`)) {
      dispatch({type: "alb listener", payload: setBool})
    } else if (event.data.includes(`(cs-${envName}-service): ${action} complete`)) {
      dispatch({type: "ecs service", payload: setBool})
    }

    console.log(event.data, "<--- event data");
  };

  source.onerror = () => {
    console.error("EventSource failed.");
  };

  source.addEventListener('close', () => {
    console.log('Source Closed')
    source.close()
  });
};