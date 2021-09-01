let defaultView, view1, view2, view3, submissionView, externalView;

/*
  Importing views and setting callbacks for controller logic
  If a view is not set, a warning will appear when starting the app
*/
try {
  defaultView = require('./defaultView.json');
  defaultView.callback_id = 'defaultView';

  submissionView = require('./submissionView.json');
  submissionView.callback_id = 'submissionView';

  externalView = require('./externalView.json');

  view1 = require('./view1.json');
  view1.callback_id = 'view1';

  view2 = require('./view2.json');
  view2.callback_id = 'view2';

  view3 = require('./view3.json');
  view3.callback_id = 'view3';

} catch (err) {
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
