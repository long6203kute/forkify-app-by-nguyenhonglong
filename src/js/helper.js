'use strict';

import { async } from 'regenerator-runtime/runtime';

import { TIME_OUT } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  const res = await Promise.race([fetch(url), timeout(TIME_OUT)]);

  const json = await res.json();

  if (!res.ok) throw new Error(`${json.message} ${res.status}`);

  const { data } = json;

  return data;
};

export const setJSON = async function (url, recipe) {
  const res = await Promise.race([
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    }),
    timeout(TIME_OUT),
  ]);

  const json = await res.json();

  if (!res.ok) throw new Error(`${json.message} ${res.status}`);

  const { data } = json;

  return data;
};
