import config from 'react-global-configuration';

config.set({
	remotehost: process.env.REACT_APP_remoteHost,
    source: process.env.REACT_APP_review_source,
    amount: process.env.REACT_APP_giftcard_amount,
    email: process.env.REACT_APP_contact_email,
    extraAward:process.env.REACT_APP_extra_award

});


export default config
