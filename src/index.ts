import { pickBy, identity, startCase } from 'lodash';
import { SidekickData } from './types';

const hashIt = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash + chr) | 0; // Convert to 32bit integer
  }
  return hash;
};

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

  const uuid = hashIt(`${contentId}-${fieldName}-${contentTypeId}-${displayVal}`);

  return pickBy(
    {
      'data-csk-entry-id': contentId,
      'data-csk-entry-field': fieldName,
      'data-csk-entry-type': contentTypeId,
      'data-csk-entry-display-text': displayVal,
      'data-csk-entry-uuid': uuid
    },
    identity
  ) as SidekickData;
};
