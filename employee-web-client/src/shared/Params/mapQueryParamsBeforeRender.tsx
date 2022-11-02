import React, { Component, ComponentType } from 'react';

import { stringify } from './queryString';
import { ShareContext, Values } from './QueryParamsProvider';
import { LocationManager } from './LocationManager';

type MapFn<Params> = (routeProps: Values & { params: Params }) => Params;

export const mapQueryParamsBeforeRender =
  <Params extends object>(mapFn: MapFn<Params>) =>
  (Wrapper: ComponentType) =>
    // eslint-disable-next-line react/display-name
    class extends Component {
      static contextType = ShareContext;

      state = {
        canRender: false,
      };

      componentDidMount() {
        const { history, location } = this.context;

        if (!history || !location) {
          throw new Error(`Missing QueryParamsProvider`);
        }

        const { params } = LocationManager<Params>(location);

        history.replace(stringify(location.pathname)(mapFn({ history, location, params })));
        this.setState({ canRender: true });
      }

      render() {
        if (!this.state.canRender) return null;

        return <Wrapper {...this.props} />;
      }
    };
