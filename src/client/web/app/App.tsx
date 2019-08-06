// Library
import React from 'react';
import FadeIn from 'react-fade-in';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';

// Redux
import Chat from '@omega-web-containers/chat';
import LoginDialog from '@omega-web-Components/login';
import { config } from '@omega-core/config';
import { getLocale } from '../../shared/state/containers/app/selectors';
import { setLocale, setToken } from '../../shared/state/containers/app/actions';

// Config

// import './App.scss';

// Internal Components

// containers
export interface PropsT {
	setLocale: (string) => {};
	t: (string) => string;
}

class App extends React.PureComponent<any, any> {
	componentDidMount() {
		const accessTokenObj = queryString.parse(
			this.props.location.search
		);
		if (typeof window !== 'undefined' && accessTokenObj && accessTokenObj.accessToken) {
			const { dispatchSetToken } = this.props;
			window.sessionStorage.setItem(
				'token',
				JSON.stringify(accessTokenObj)
			);
			dispatchSetToken(accessTokenObj.accessToken);
			window.location.search = '';
		}
 		else {
			try {
				const { dispatchSetToken } = this.props;
				const accessTokenStorage =
					window.sessionStorage.getItem('token') &&
					JSON.parse(window.sessionStorage.getItem('token'));
					if (accessTokenStorage && accessTokenStorage.accessToken) {
						dispatchSetToken(accessTokenStorage.accessToken);
					}
			}
 			catch(error) {
				console.log('error', error)
			}
		}
	}

	setLanguage = (e: any) => {
		const { dispatchSetLocale } = this.props;
		dispatchSetLocale(e.target.value);
	};

	handleLoginClick = () => {
		if (typeof window !== 'undefined') {
			window.location.href = Config.API_URL + config.LOGIN_URL;
		}
	};

	renderChat = () => {
		const { t, app } = this.props;
		const { accessToken } = app;
		return accessToken === '' ? (
			<LoginDialog
				show={accessToken === ''}
				handleLoginClick={this.handleLoginClick}
			/>
		) : (
			<div
				style={{
					filter: accessToken === '' ? 'blur(10px)' : 'none'
				}}
			>
				<div
					style={{
						position: 'absolute',
						zIndex: 1,
						right: '14%',
						top: 26
					}}
				>
					<button value='de-DE' onClick={this.setLanguage}>
						Deutsch
					</button>
					<button value='en-US' onClick={this.setLanguage}>
						English
					</button>
				</div>
				<Chat title={t('i18n-example')} accessToken={accessToken} />
			</div>
		);
	}

	renderAppScreen = () => {
		return (
			<FadeIn>
				<Helmet
					defaultTitle='React Redux SSR Advanced Seed'
					titleTemplate='%s – React Redux SSR Advanced Seed'
				/>
				{ this.renderChat() }
			</FadeIn>
		);
	};

	render() {
		const { t, tReady, app } = this.props;
		const { accessToken } = app;
		return tReady ? this.renderAppScreen() : [];
	}
}

const mapDispatchToProps = {
	dispatchSetLocale: (locale: any) => setLocale(locale),
	dispatchSetToken: (token: any) => setToken(token)
};

const mapStateToProps = (state: { app: any }) => ({
	app: getLocale(state)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation()(App));
