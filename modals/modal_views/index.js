let defaultView, view1, view2, view3, submissionView, externalView;
let error = false;

try {
  defaultView = require('./defaultView.json');
  defaultView.callback_id = 'defaultView';
} catch (err) {
  error = true;
}

try {
  view1 = require('./view1.json');
  view1.callback_id = 'view1';
} catch (err) {
  error = true;
}

try {
  view2 = require('./view2.json');
  view2.callback_id = 'view2';
} catch (err) {
  error = true;
}

try {
  view3 = require('./view3.json');
  view3.callback_id = 'view3';
} catch (err) {
  error = true;
}

try {
  submissionView = require('./submissionView.json');
  submissionView.callback_id = 'submissionView';
} catch (err) {
  error = true;
}

try {
  externalView = require('./externalView.json');
} catch (err) {
  error = true;
}

if (error) {
  console.log(
    "---------------\nOne or more views have not been set. Views can be set in the '/views' folder\n---------------"
  );
}

module.exports = {
  defaultView: defaultView,
  view1: view1,
  view2: view2,
  view3: view3,
  submissionView: submissionView,
  externalView: externalView,
};
