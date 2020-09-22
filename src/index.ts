import { pickBy, identity, startCase } from 'lodash';
import { SidekickData } from './types';

export default (
  contentId?: string,
  fieldName?: string,
  contentTypeId?: string,
  displayText?: string
): SidekickData | null => {
  if (!contentId && !displayText) return null;

  const getDisplayVal = (): string => {
    if (displayText) return displayText;
    if (fieldName) return startCase(fieldName);
    if (contentTypeId) return startCase(contentTypeId);
    return 'Item';
  };

  const displayVal = getDisplayVal();

  return pickBy(
    {
      'data-csk-entry-id': contentId,
      'data-csk-entry-field': fieldName,
      'data-csk-entry-type': contentTypeId,
      'data-csk-entry-display-text': displayVal
    },
    identity
  ) as SidekickData;
};
