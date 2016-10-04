/* eslint-disable no-console */

import { Observable } from 'rxjs-es/Observable';
import { Subject } from 'rxjs-es/Subject';

import 'rxjs-es/add/observable/of';
import 'rxjs-es/add/observable/dom/ajax';
import 'rxjs-es/add/observable/fromEvent';
import 'rxjs-es/add/observable/merge';

import 'rxjs-es/add/operator/map';
import 'rxjs-es/add/operator/filter';
import 'rxjs-es/add/operator/mergeAll';
import 'rxjs-es/add/operator/do';
import 'rxjs-es/add/operator/switch';
import 'rxjs-es/add/operator/switchMap';
import 'rxjs-es/add/operator/retry';
import 'rxjs-es/add/operator/debounce';

import { shouldLoadAnchor } from './smooth-state-util';

window.Observable = Observable;

const LINK_SELECTOR = 'a[href]'; // 'a[href^="/"]';
const CONTENT_SELECTOR = 'main';

function makeSmooth(contentSelector = CONTENT_SELECTOR, linkSelector = LINK_SELECTOR) {
  const titleElement = document.querySelector('title') || {};

  function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
  }

  function beNice(e, options = {}) {
    return (
      !e.metaKey &&
      !e.ctrlKey &&
      shouldLoadAnchor(e.currentTarget, options.blacklist, options.hrefRegex)
    );
  }

  function bindEvents(d = document) {
    return Observable.of(d.querySelectorAll(linkSelector))
      .map(link => Observable.fromEvent(link, 'click'))
      .mergeAll()
      .filter(beNice)
      .do(e => e.preventDefault())
      .map(e => e.currentTarget.href);
  }

  function hrefToRquestData({ href, isPush }) {
    return {
      isPush,
      requestData: {
        method: 'GET',
        url: href,
        responseType: 'text',
      },
    };
  }

  function makeRequest({ requestData, isPush }) {
    return Observable
      .ajax(requestData)
      .retry(3)
      .map(ajaxResponse => ({
        ajaxResponse,
        isPush,
      }));
      // TODO: catch and show error msg
      // .catch(() => Observable.empty())
  }

  function ajaxResponseToCache({ isPush, ajaxResponse }) {
    const documentFragment = fragmentFromString(ajaxResponse.response);
    const title = (documentFragment.querySelector('title') || {}).textContent;
    const url = ajaxResponse.request.url;

    // TODO: abort if content_selector not present
    const content = documentFragment.querySelector(contentSelector);

    return { title, url, content, isPush };
  }

  function updateDOMContent({ title, content, url, isPush }) {
    // update content
    const main = document.querySelector(contentSelector);
    main.parentNode.replaceChild(content, main); // TODO: Don't add all at once!?
    // main.innerHTML = content.innerHTML; // TODO: could this be faster?

    // update title
    titleElement.textContent = title;

    // push new frame to history if not a popstate
    if (isPush) window.history.pushState({}, title, url);
    if (isPush) document.body.scrollTop = 0;
  }

  // Observable<Observable<ClickEvents>>
  const clickClick$ = new Subject();

  const pushstate$ = clickClick$
    .switch()
    .map(href => ({
      isPush: true,
      href,
    }));

  const popstate$ = Observable.fromEvent(window, 'popstate')
    .filter(({ state }) => state != null)
    .map(() => ({
      isPush: false,
      href: window.location.href,
    }));

  Observable.merge(pushstate$, popstate$)
    .map(hrefToRquestData)
    .do(() => document.body.classList.add('is-loading'))
    .switchMap(makeRequest)
    .map(ajaxResponseToCache)
    .do(updateDOMContent)
    .do(() => document.body.classList.remove('is-loading'))
    // TODO: catch
    .subscribe(() => {
      clickClick$.next(bindEvents()); // TODO: possible without subject?
    });

  // TODO: startwith instead?
  clickClick$.next(bindEvents());
}

// TODO: options
makeSmooth();
