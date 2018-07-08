/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  let entry = document.querySelector('.entry')
  let feed = document.querySelector('.feed')
  let entriesStart
  let entriesEnd

  // there are 4 test suites total

  // The first test suite which contains a related set of tests
  // This suite is all about the RSS feeds definitions, 
  // the allFeeds variable in our application

  describe('RSS Feeds', function () {
    // This tests make sure that the allFeeds variable
    // has been defined, and that it is not empty.
    it('are defined', function () {
      // i expect all feeds are defined, so they exist
      // inside allFeeds
      expect(allFeeds).toBeDefined()

      // i expect allFeeds(an array of all feeds) has a length
      // that is not equal to zero
      expect(allFeeds.length).not.toBe(0)
    })

    // This test loops through each feed in the allFeeds, and 
    // ensures it has a URL defined, and that the URL is not empty
    it('URLs defined', function () {
      for (let i = 0; i < allFeeds.length; i++) {
        // i expect allFeeds' url has defined URL
        expect(allFeeds[i].url).toBeDefined()
        // i expect allFeeds's length of URL is not zero
        expect(allFeeds[i].url.length).not.toBe(0)
      }
    })

    // This test loops through each feed in the allFeeds object, and 
    // ensures it has a name defined and that the name is not empty.
    it('names are defined', function () {
      for (let h = 0; h < allFeeds.length; h++) {
        // i expect allFeeds' name is defined
        expect(allFeeds[h].name).toBeDefined()
        // i expect allFeeds's length of name is not zero
        expect(allFeeds[h].name.length).not.toBe(0)
      }
    })
  })

  // Write a new test suite named "The menu"
  describe('The Menu', function () {
    const body = document.querySelector('body')
    const menuIcon = document.querySelector('.menu-icon-link')

    // This is a test that ensures the menu element is hidden by default. 
    it('element is hidden', function () {
      // i expect body has a class of menu-hidden to be equal to true
      expect(body.classList.contains('menu-hidden')).toEqual(true)
    })

    // This is a test that ensures the menu changes visibility 
    // when the menu icon is clicked. 
    // This test should have two expectations: does the menu display when
    // clicked and does it hide when clicked again.

    it('visibility when clicked', function () {

      // i expect body has menu-hidden to be false 
      menuIcon.click()
      expect(body.classList.contains('menu-hidden')).toBe(false)

      // i expect body has menu-hidden to be true
      menuIcon.click()
      expect(body.classList.contains('menu-hidden')).toBe(true)
    })
  })

  // This is a test suite named "Initial Entries" 
  // This tests ensures when the loadFeed() is called and completes its work, 
  // there is at least a single .entry element within the .feed container.

  describe('Initial Entries', function () {

    // this beforeEach calls a function to do an asynchronous request 
    beforeEach(function (done) {
      loadFeed(0, function () {
        done()
      })
    })

    // if the loadFeed() has at least a single entry
    it('define if entry has more than 0 entry', function () {
      expect(entry).toBeDefined()
      expect(feed).toBeDefined()
    })
  })

  // This test ensures when a new feed is loaded by loadFeed()
  // that the contect actually changes.
  describe('New Feed Selection', function () {

    // beforeEach ensures that the new feed is loaded via loadFeed()
    beforeEach(function (done) {
      // empty the feed
      feed = []

      // loads the first feed
      loadFeed(0, function () {
        // entryStart searches for the first feed for the URL(jQuery)
        entriesStart = $('.feed').find(allFeeds.url)
        done()
      })

      // loads the second feed
      loadFeed(1, function () {
        // entriesEnd seaches for the first feed for the URL(jQuery)
        entriesEnd = $('.feed').find(allFeeds.url)
        done()
      })
    })

    it('content changes', function () {
      // i expect that the new feed is different from the old feed
      expect(entriesStart).not.toBe(entriesEnd)
    })
  })
}())
