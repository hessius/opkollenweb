// @ts-nocheck
// Yb    dP    db    8    8    8 8888    .d88b    db    8    .d88b
//  Yb  dP    dPYb   8    8    8 8www    8P      dPYb   8    8P
//   YbdP    dPwwYb  8    8b..d8 8       8b     dPwwYb  8    8b
//    YP    dP    Yb 8888 `Y88P' 8888    `Y88P dP    Yb 8888 `Y88P

var ctx = document.getElementById('myChart').getContext('2d')

function costData() {
  var data = {
    weeks: {
      label: 'Veckor med opererande verksamhet (per år)',
      data: function () {
        return 40
      }
    },
    weeklyPatients: {
      label: 'Antal patienter per vecka',
      data: function () {
        return $('#ppw').val()
      }
    },
    yearlyPatients: {
      label: 'Antal patienter per år',
      data: function () {
        return costData().weeklyPatients.data() * costData().weeks.data()
      }
    },
    costOfStay: {
      label: 'Kostnad per vårddygn',
      data: function () {
        return 6000
      }
    },
    lengthOfStay: {
      label: 'Genomsnittlig vårdtid',
      data: function () {
        return $('#los').val()
      }
    },
    costOfSurgery: {
      label: 'Kostnad per operation',
      data: function () {
        return 30000
      }
    },
    fractionOfCancellations: {
      label: 'Andel strykningar',
      data: function () {
        return $('#foc').val() / 100
      }
    },
    fractionOfAvoidableCancellations: {
      label: 'Andel av strykningar som är undvikbara',
      data: function () {
        return 0.25
      }
    },
    avoidableCancellations: {
      label: 'Totalt antal undvikbara strykningar',
      data: function () {
        return (
          costData().fractionOfCancellations.data() *
          costData().fractionOfAvoidableCancellations.data() *
          costData().yearlyPatients.data()
        )
      }
    },
    totalCostStay: {
      label: 'Totalkostnad sjukhusvistelse',
      data: function () {
        return (
          costData().lengthOfStay.data() *
          costData().yearlyPatients.data() *
          costData().costOfStay.data()
        )
      }
    },
    totalCostSurgeries: {
      label: 'Totalkostnad sjukhusvistelse',
      data: function () {
        return (
          costData().yearlyPatients.data() * costData().costOfSurgery.data()
        )
      }
    },
    totalCostAvoidableCancellations: {
      label: 'Totalkostnad undvikbara strykningar',
      data: function () {
        return (
          costData().avoidableCancellations.data() *
          costData().costOfSurgery.data()
        )
      }
    },
    maxDaysSaved: {
      label: 'Antal vårddygn som kan sparas (målbild)',
      data: function () {
        var los = costData().lengthOfStay.data()
        if (los > 2) {
          return los - 2
        } else return los * 0.2
      }
    },
    maxDaysSavedSuccessRate: {
      label: 'Andel patienter som projiceras nå målbild kring vårdtid',
      data: function () {
        return 0.6
      }
    },
    savingsDaysSaved: {
      label: 'Totalbesparing för kortad vårdtid',
      data: function () {
        return (
          costData().maxDaysSaved.data() *
          costData().maxDaysSavedSuccessRate.data() *
          costData().yearlyPatients.data() *
          costData().costOfStay.data()
        )
      }
    },
    cancellationReductionRate: {
      label: 'Andel undvikbara strykningar som projiceras gå att förebygga',
      data: function () {
        return 0.5
      }
    },
    savingsReducedCancellations: {
      label: 'Totalbesparing för strykningar',
      data: function () {
        return (
          costData().totalCostAvoidableCancellations.data() *
          costData().cancellationReductionRate.data()
        )
      }
    }
  }
  return data
}

function chartData() {
  return [
    costData().savingsDaysSaved.data(),
    costData().savingsReducedCancellations.data()
  ]
}

function chartOptions() {
  return {
    type: 'doughnut',
    data: {
      labels: [
        costData().savingsDaysSaved.label +
        ' ' +
        SEKcurrency(costData().savingsDaysSaved.data()),
        costData().savingsReducedCancellations.label +
        ' ' +
        SEKcurrency(costData().savingsReducedCancellations.data())
      ],
      datasets: [
        {
          // label: '# of Votes',
          data: chartData(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: false
      },
      legend: {
        labels: {
          fontSize: getBootstrapDeviceSize() === 'xs' ? 8 : 12
        }
      }
      // scales: {
      //     yAxes: [{
      //         ticks: {
      //             beginAtZero: true
      //         }
      //     }]
      // }
    }
  }
}

function SEKcurrency(number) {
  return number.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK'
  })
}

function calcValue() {
  var number =
    costData().savingsDaysSaved.data() +
    costData().savingsReducedCancellations.data()
  $('#savings .number')
    .html(SEKcurrency(number))
    .css('overflow-wrap', 'break-word')
  myChart = new Chart(ctx, chartOptions())
}

// 8   8 8888    db    888b. 8    888 8b  8 8888       db    8b  8 888 8b   d8
// 8www8 8www   dPYb   8   8 8     8  8Ybm8 8www      dPYb   8Ybm8  8  8YbmdP8
// 8   8 8     dPwwYb  8   8 8     8  8  "8 8        dPwwYb  8  "8  8  8  "  8
// 8   8 8888 dP    Yb 888P' 8888 888 8   8 8888    dP    Yb 8   8 888 8     8

var animationDelay = 2500

function animateHeadline($headlines) {
  $headlines.each(function () {
    var headline = $(this)
    // trigger animation
    setTimeout(function () {
      hideWord(headline.find('.is-visible'))
    }, animationDelay)
    // other checks here ...
  })

  function hideWord($word) {
    var nextWord = takeNext($word)
    switchWord($word, nextWord)
    setTimeout(function () {
      hideWord(nextWord)
    }, animationDelay)
  }

  function takeNext($word) {
    return !$word.is(':last-child')
      ? $word.next()
      : $word
        .parent()
        .children()
        .eq(0)
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden')
    $newWord.removeClass('is-hidden').addClass('is-visible')
  }
}

// 888 8b   d8 .d88b     .d88b. Yb        dP 888 88888 .d88b 8   8 8888 888b.
//  8  8YbmdP8 8P www    YPwww.  Yb  db  dP   8    8   8P    8www8 8www 8  .8
//  8  8  "  8 8b  d8        d8   YbdPYbdP    8    8   8b    8   8 8    8wwK'
// 888 8     8 `Y88P'    `Y88P'    YP  YP    888   8   `Y88P 8   8 8888 8  Yb

function stick() {
  if ($(window).width() > 991) {
    $('.device-col').stick_in_parent({
      bottoming: false
    })
  } else {
    $('.device-col').trigger('sticky_kit:detach')
  }
}

function imageSwitcher() {
  var t = 2500 // Initial wait
  var s = 7500 // Stepper
  setTimeout(function () {
    $('img.five').css('opacity', 0)
    $('img.one').css('opacity', 1)
    $('img.top').css('opacity', 0)
  }, t)
  setTimeout(function () {
    $('img.top').css('opacity', 1)
  }, (t = t + s))
  setTimeout(function () {
    $('img.one').css('opacity', 0)
    $('img.two').css('opacity', 1)
    $('img.top').css('opacity', 0)
  }, (t = t + s))
  setTimeout(function () {
    $('img.top').css('opacity', 1)
  }, (t = t + s))

  setTimeout(function () {
    $('img.two').css('opacity', 0)
    $('img.three').css('opacity', 1)
    $('img.top').css('opacity', 0)
  }, (t = t + s))
  setTimeout(function () {
    $('img.top').css('opacity', 1)
  }, (t = t + s))

  setTimeout(function () {
    $('img.three').css('opacity', 0)
    $('img.four').css('opacity', 1)
    $('img.top').css('opacity', 0)
  }, (t = t + s))
  setTimeout(function () {
    $('img.top').css('opacity', 1)
  }, (t = t + s))

  setTimeout(function () {
    $('img.four').css('opacity', 0)
    $('img.five').css('opacity', 1)
    $('img.top').css('opacity', 0)
  }, (t = t + s))
  setTimeout(function () {
    $('img.top').css('opacity', 1)
  }, (t = t + s))
  setTimeout(function () {
    imageSwitcher()
  }, (t = t + s - 2500))
}

function callPhone() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    location.href = 'tel://0707720795'
  } else {
    $('#telephoneModal').modal('show')
  }
}

function once(fn, context) {
  var result

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments)
      fn = null
    }

    return result
  }
}

function getBootstrapDeviceSize() {
  return $('#users-device-size')
    .find('div:visible')
    .first()
    .attr('id')
}

// .d88b. 8b  8    888b. 8888    db    888b. Yb  dP
// 8P  Y8 8Ybm8    8  .8 8www   dPYb   8   8  YbdP
// 8b  d8 8  "8    8wwK' 8     dPwwYb  8   8   YP
// `Y88P' 8   8    8  Yb 8888 dP    Yb 888P'   88

$(document).ready(function () {
  $(document.body).trigger('sticky_kit:recalc')
  $(window).resize(function () {
    stick()
  })
  stick()

  $('.header-content').animatedHeadline()
  imageSwitcher()

  animateHeadline($('.cd-headline'))

  calcValue()

  $('#valueForm input').change(() => calcValue())

  window.myChart = new Chart(ctx, chartOptions())

  $('[data-toggle="tooltip"]').tooltip()

  os.on('enter', '#customers', function (element, event) {
    console.log('enter customers')
    customerCounter.doCount()
  })
  os.on('enter', '#who', function (element, event) {
    console.log('enter who')
    $('#who').animatedHeadline({
      animationType: 'type'
    })
  })
  updateYear()
})

var customerCounter = {
  counting: false,
  doCount: function () {
    if (this.counting) {
      return
    }
    this.counting = true
    $('#customers .count').each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text()
          },
          {
            duration: 30000,
            easing: 'easeInOutQuart',
            step: function (now) {
              $(this).text(Math.ceil(now))
            }
          }
        )
    })
    setTimeout(function () {
      console.log(customerCounter.counting)
      customerCounter.counting = false
      console.log(customerCounter.counting)
    }, 30050)
  }
}

function updateEmailAddresses() {
  let arr = $('.mailgo')
  $.each(arr, i =>
    $(arr[i]).text(
      $(arr[i])
        .text()
        .replace('[a]', '@')
    )
  )
}

function updateYear() {
  let d = new Date()
  let y = d.getFullYear()

  $('.currentYear').html(y)
}

var synergyList = {};
synergyList.opacityIn = [0, 1];
synergyList.scaleIn = [0.2, 1];
synergyList.scaleOut = 3.5;
synergyList.durationIn = 600;
synergyList.durationOut = 400;
synergyList.delay = 2000;

anime.timeline({ loop: true })
  .add({
    targets: '.synergyList .letters-1',
    opacity: synergyList.opacityIn,
    scale: synergyList.scaleIn,
    duration: synergyList.durationIn
  }).add({
    targets: '.synergyList .letters-1',
    opacity: 0,
    scale: synergyList.scaleOut,
    duration: synergyList.durationOut,
    easing: "easeInExpo",
    delay: synergyList.delay
  }).add({
    targets: '.synergyList .letters-2',
    opacity: synergyList.opacityIn,
    scale: synergyList.scaleIn,
    duration: synergyList.durationIn
  }).add({
    targets: '.synergyList .letters-2',
    opacity: 0,
    scale: synergyList.scaleOut,
    duration: synergyList.durationOut,
    easing: "easeInExpo",
    delay: synergyList.delay
  }).add({
    targets: '.synergyList .letters-3',
    opacity: synergyList.opacityIn,
    scale: synergyList.scaleIn,
    duration: synergyList.durationIn
  }).add({
    targets: '.synergyList .letters-3',
    opacity: 0,
    scale: synergyList.scaleOut,
    duration: synergyList.durationOut,
    easing: "easeInExpo",
    delay: synergyList.delay
  }).add({
    targets: '.synergyList .letters-4',
    opacity: synergyList.opacityIn,
    scale: synergyList.scaleIn,
    duration: synergyList.durationIn
  }).add({
    targets: '.synergyList .letters-4',
    opacity: 0,
    scale: synergyList.scaleOut,
    duration: synergyList.durationOut,
    easing: "easeInExpo",
    delay: synergyList.delay
  });



updateEmailAddresses()
