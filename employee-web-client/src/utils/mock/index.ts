import { MockService } from './MockService';
import { accessibilityHost, managementHost } from '../http/service';

export const managementMockService = new MockService(managementHost);
export const accessibilityMockService = new MockService(accessibilityHost);
