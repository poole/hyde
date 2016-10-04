/* eslint-disable class-methods-use-this */

import { Observable } from 'rxjs-es/Observable';
import { Subject } from 'rxjs-es/Subject';

import 'rxjs-es/add/observable/empty';
import 'rxjs-es/add/observable/fromEvent';
import 'rxjs-es/add/observable/merge';
import 'rxjs-es/add/observable/of';

import 'rxjs-es/add/observable/dom/ajax';

import 'rxjs-es/add/operator/catch';
import 'rxjs-es/add/operator/do';
import 'rxjs-es/add/operator/filter';
import 'rxjs-es/add/operator/map';
import 'rxjs-es/add/operator/mergeAll';
import 'rxjs-es/add/operator/retry';
import 'rxjs-es/add/operator/switch';
import 'rxjs-es/add/operator/switchMap';

import { shouldLoadAnchor } from './smooth-state-util';

// window.Observable = Observable;

const LINK_SELECTOR = 'a[href]'; // 'a[href^="/"]';
const CONTENT_SELECTOR = 'main';
const LOADING_CLASS = 'is-loading';

// requirements
// object.assign, queryslector, el.match

export default class SmoothState {
  static fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
  }

  constructor(el, options) {
    this.options = Object.assign({
      contentSelector: CONTENT_SELECTOR,
      linkSelector: LINK_SELECTOR,
      loadingClass: LOADING_CLASS,
    }, options);

    // TODO: improve API
    if (el.querySelector(this.options.contentSelector) == null) {
      throw Error('el needs to contain content');
    }
    this.el = el;

    this.bindCallbacks();

    // cache title element
    this.titleElement = document.querySelector('title') || {};

    const click$$ = new Subject();

    const pushstate$ = click$$
      .switch()
      .map(href => ({
        push: true,
        href,
      }));

    const popstate$ = Observable.fromEvent(window, 'popstate')
      .filter(({ state }) => state != null)
      .map(() => ({
        push: false,
        href: window.location.href,
      }));

    Observable.merge(pushstate$, popstate$)
      .do(this.onBefore)
      .map(this.hrefToRquestData)
      .switchMap(this.makeRequest)
      .map(this.ajaxResponseToContent)
      .subscribe((hairball) => {
        this.updateDOM(hairball);
        click$$.next(this.bindEvents());
        this.onAfter();
      });

    // let's get the party started
    click$$.next(this.bindEvents());
  }

  bindCallbacks() {
    this.beNice = this.beNice.bind(this);
    this.hrefToRquestData = this.hrefToRquestData.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
    this.ajaxResponseToContent = this.ajaxResponseToContent.bind(this);
    this.updateDOM = this.updateDOM.bind(this);
    this.onBefore = this.onBefore.bind(this);
    this.onAfter = this.onAfter.bind(this);
  }

  onBefore() {
    document.body.classList.add(this.options.loadingClass);
    this.el.dispatchEvent(new Event('beforesmoothstate'));
  }

  onAfter() {
    document.body.classList.remove(this.options.loadingClass);
    this.el.dispatchEvent(new Event('aftermoothstate'));
  }

  onError() {
    document.body.classList.remove(this.options.loadingClass);
    // if (this.options.onError) this.options.onError(e);
  }

  beNice(e) {
    return (
      !e.metaKey &&
      !e.ctrlKey &&
      shouldLoadAnchor(e.currentTarget, this.options.blacklist, this.options.hrefRegex)
    );
  }

  bindEvents(d = document) {
    return Observable.of(d.querySelectorAll(this.options.linkSelector))
      .map(link => Observable.fromEvent(link, 'click'))
      .mergeAll()
      .filter(this.beNice)
      .do(e => e.preventDefault())
      .map(e => e.currentTarget.href);
  }

  hrefToRquestData(hairball) {
    return Object.assign(hairball, {
      requestData: {
        method: 'GET',
        url: hairball.href,
        responseType: 'text',
      },
    });
  }

  makeRequest(hairball) {
    return Observable
      .ajax(hairball.requestData)
      .retry(3)
      .map(ajaxResponse => Object.assign(hairball, { ajaxResponse }))
      .catch((e) => {
        this.onError(e);
        return Observable.empty();
      });
  }

  ajaxResponseToContent(hairball) {
    const documentFragment = SmoothState.fragmentFromString(hairball.ajaxResponse.response);
    const title = (documentFragment.querySelector('title') || {}).textContent;
    const url = hairball.ajaxResponse.request.url;

    // TODO: abort if content_selector not present
    const content = documentFragment.querySelectorAll(this.options.contentSelector);

    return Object.assign(hairball, { title, url, content });
  }

  updateDOM({ title, content, url, push }) {
    // replace content
    const oldContent = this.el.querySelectorAll(this.options.contentSelector);

    if (content.length === oldContent.length) {
      // TODO: warn
    }

    Array.from(oldContent).forEach((oldElement, i) => {
      oldElement.parentNode.replaceChild(content[i], oldElement);
    });

    // update title separately
    // TODO: update meta description?
    this.titleElement.textContent = title;

    // push new frame to history if not a popstate
    if (push) {
      window.history.pushState({}, title, url);
      window.scrollTo(window.pageXOffset, 0);
    }
  }
}
