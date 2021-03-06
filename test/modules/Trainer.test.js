'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var assert = require('assert')
var Trainer = require('../../lib/modules/Trainer.js')

describe('Trainer', function () {

  it('appendCleanTokens', function () {
    var data = jsonfile.readFileSync('./test/fixtures/tweet13.json')
    data = Trainer.appendCleanTokens(data)
    assert(data.length === 13)
    data.forEach(function (datum) {
      assert('label' in datum)
      assert('text' in datum)
      assert('tokens' in datum)
    })
  })

  it('getWordFreq', function () {
    var data = jsonfile.readFileSync('./test/fixtures/tweet13.json')
    data = Trainer.appendCleanTokens(data)
    var freqs = Trainer.getWordFreq(data)
    freqs.forEach(function (f) {
      assert('label' in f)
      assert('freq' in f)
    })
  })

  it('getTFIDF', function () {
    var data = jsonfile.readFileSync('./test/fixtures/tweet13.json')
    data = Trainer.appendCleanTokens(data)
    var freqs = Trainer.getWordFreq(data)
    var tfidfs = Trainer.getTFIDF(freqs)
    tfidfs.forEach(function (f) {
      assert('label' in f)
      assert('tfidf' in f)
      assert(_.isArray(f.tfidf))
    })
  })

  it('appendScores', function () {
    var data = jsonfile.readFileSync('./test/fixtures/tweet13.json')
    var tfidf = jsonfile.readFileSync('./test/fixtures/tfidf10.json')
    data = Trainer.appendScores(data, tfidf)
    data.forEach(function (f) {
      assert('labels' in f)
      assert('scores' in f)
    })
  })

  it('train', function () {
    var data = jsonfile.readFileSync('./test/fixtures/tweet13.json')
    Trainer
      .train(data)
      .then(function (result) {
        assert('labels' in result)
        assert('svm' in result)
        assert('tfidf' in result)
      })
  })

})
