export class RouteShortInfo {
  constructor(public routeId: number, public name: string) {}
}

export class RouteStopsInfo {
  constructor(public stopId: number, public name: string) {}
}

export interface RouteWithBusRating {
  routeName: string;
  averageBusRating: number;
}

export interface RouteRevenue {
  routeName: string;
  totalRevenue: number;
}
