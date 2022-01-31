import faker from 'faker';
import { camelCase } from 'lodash';
import sidekick from './index';
import startCase from './startCase';
import { ContentData } from './types';

let contentId = faker.random.alphaNumeric(10);
let fieldName = camelCase(faker.random.words());
let contentTypeId = camelCase(faker.random.words());
let displayText = faker.random.words();

beforeEach(() => {
  contentId = faker.random.alphaNumeric(10);
  fieldName = camelCase(faker.random.words());
  contentTypeId = camelCase(faker.random.words());
  displayText = faker.random.words();
});


describe('sidekick util', () => {
  it('outputs null if no id or display text is passed in', () => {
    contentId = null;
    fieldName = 'something';
    contentTypeId = 'else';
    const contentData: ContentData = { contentId, fieldName, contentTypeId };
    const outWithObject = sidekick(contentData);
    const out = sidekick(contentId, fieldName, contentTypeId);
    expect(out).toBe(outWithObject);
    expect(out).toBe(null);
  });
  it('outputs correct data if everything is passed in', () => {
    const contentData: ContentData = { contentId, fieldName, contentTypeId, displayText };
    const outWithObject = sidekick(contentData);
    const out = sidekick(contentId, fieldName, contentTypeId, displayText);
    expect(JSON.stringify(out)).toBe(JSON.stringify(outWithObject));
    expect(out).not.toBe(null);
    expect(out['data-csk-entry-id']).toBe(contentId);
    expect(out['data-csk-entry-field']).toBe(fieldName);
    expect(out['data-csk-entry-type']).toBe(contentTypeId);
    expect(out['data-csk-entry-display-text']).toBe(displayText);
    expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs display text "Item" if nothing but id is passed in', () => {
    const outWithObject = sidekick({ contentId });
    const out = sidekick(contentId);
    expect(JSON.stringify(out)).toBe(JSON.stringify(outWithObject));
    expect(out).not.toBe(null);
    expect(out['data-csk-entry-display-text']).toBe('Item');
    expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if field is passed in', () => {
    const outWithObject = sidekick({ contentId, fieldName });
    const out = sidekick(contentId, fieldName);
    expect(JSON.stringify(out)).toBe(JSON.stringify(outWithObject));
    expect(out).not.toBe(null);
    expect(out['data-csk-entry-display-text']).toBe(startCase(fieldName));
    expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if field and type are passed in', () => {
    contentTypeId = camelCase(`${faker.random.words()} hi}`);
    const outWithObject = sidekick({ contentId, fieldName, contentTypeId });
    const out = sidekick(contentId, fieldName, contentTypeId);
    expect(JSON.stringify(out)).toBe(JSON.stringify(outWithObject));
    expect(out).not.toBe(null);
    expect(out['data-csk-entry-display-text']).toBe(startCase(fieldName));
    expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if type is passed in', () => {
    fieldName = null;
    const outWithObject = sidekick({ contentId, fieldName, contentTypeId });
    const out = sidekick(contentId, fieldName, contentTypeId);
    expect(JSON.stringify(out)).toBe(JSON.stringify(outWithObject));
    expect(out).not.toBe(null);
    expect(out['data-csk-entry-display-text']).toBe(startCase(contentTypeId));
    expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
});
