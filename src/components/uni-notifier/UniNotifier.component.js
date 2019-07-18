import React from 'react';
import toastr from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import { Trans } from 'react-i18next';

const defaults = {
    position: 'bottom',
    duration: 3000
};

export const notify = (messageKey, options = defaults) => {
    toastr.notify(<Trans>{messageKey}</Trans>, { ...options, ...defaults });
}
