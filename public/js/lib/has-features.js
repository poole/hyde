import './modernizr';

export default function hasFeatures(features) {
  var acc = true;
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var hasFeature = Modernizr[feature];
    // if (!hasFeature) console.warn('Feature "' + feature + '" missing!');
    acc = acc && hasFeature;
  }
  return acc;
}
