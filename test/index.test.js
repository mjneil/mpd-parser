import { parse, VERSION } from '../src';
import QUnit from 'qunit';

// manifests
import maatVttSegmentTemplate from './manifests/maat_vtt_segmentTemplate.mpd';
import segmentBaseTemplate from './manifests/segmentBase.mpd';
import segmentListTemplate from './manifests/segmentList.mpd';
import {
  parsedManifest as maatVttSegmentTemplateManifest
} from './manifests/maat_vtt_segmentTemplate.js';
import {
  parsedManifest as segmentBaseManifest
} from './manifests/segmentBase.js';
import {
  parsedManifest as segmentListManifest
} from './manifests/segmentList.js';

QUnit.module('mpd-parser');

QUnit.test('has VERSION', function(assert) {
  assert.ok(VERSION);
});

QUnit.test('has parse', function(assert) {
  assert.ok(parse);
});

[{
  name: 'maat_vtt_segmentTemplate',
  input: maatVttSegmentTemplate,
  expected: maatVttSegmentTemplateManifest
}, {
  name: 'segmentBase',
  input: segmentBaseTemplate,
  expected: segmentBaseManifest
}, {
  name: 'segmentList',
  input: segmentListTemplate,
  expected: segmentListManifest
}].forEach(({ name, input, expected }) => {
  QUnit.test(`${name} test manifest`, function(assert) {
    const actual = parse(input, { NOW: 10000 });

    assert.deepEqual(actual, expected);
  });
});
