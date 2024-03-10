'use strict'
// smooth scroll

const scrollToSections = (optionsData, targetSelector) => {

	const links = document.querySelectorAll(targetSelector || 'a[href^="#"]')
	const { block, behavior, inline } = optionsData
	const options = {
		block: block || 'start',
		behavior: behavior || 'smooth',
		inline: inline || 'nearest' 
	}

links.forEach(link => {
	link.addEventListener('click', evt => {
		evt.preventDefault()
		const targetSectionSelector = link.getAttribute('href')

		if (targetSectionSelector !== '#') {
			const targetSection = document.querySelector(targetSectionSelector)
			targetSection.scrollIntoView(options)
		}else {
			console.warn('Секция: ' + '"' + link.textContent + '"' + ' не найдена')
		}
	})
})}

scrollToSections({
	behavior: 'smooth',
	block: 'start',
	inline: 'center'
})

// participants slider

const getParticipantsSlider = () => {
	const participantsSlider = document.querySelector('.participants__slider')
	const participantsSliderWrap = document.querySelector('.participants__slider-wrap')
	const participantsSliderItems = document.querySelectorAll('.participants__item')
	const participantsPrevBtn = document.querySelector('.participants__btn--prev')
	const participantsNextBtn = document.querySelector('.participants__btn--next')
	const participantsCurrent = document.querySelector('.participants__buttons-text-active')
	const participantsAll = document.querySelector('.participants__buttons-text')
	
	let participantsCurrentLine = 0
	let participantsCurrentSlide = 1
	
	const renderInfo = () => {
		participantsCurrent.textContent = participantsCurrentSlide
		participantsAll.textContent = participantsSliderItems.length
	}
	
	const driveSlides = (where) => {
		const slideWidth = participantsSliderItems[0].offsetWidth
	
		if (where === 'prev') {
			if (participantsCurrentSlide > 1) {
				participantsCurrentSlide--
				participantsCurrentLine -= slideWidth
				participantsSliderWrap.style.cssText = `transform: translateX(-${participantsCurrentLine}px)`
			}
		}
	
		if (where === 'next') {
			if (participantsCurrentSlide < participantsSliderItems.length) {
				participantsCurrentSlide++
				participantsCurrentLine += slideWidth
				participantsSliderWrap.style.cssText = `transform: translateX(-${participantsCurrentLine}px)`
			}
	
			if (participantsCurrentSlide === participantsSliderItems.length) {
				console.log('object');
				participantsCurrentLine = 0
				participantsCurrentSlide = 0
				renderInfo()
				driveSlides('next')
			}
		}
		renderInfo()
	}
	
	participantsPrevBtn.addEventListener('click', () => {
		driveSlides('prev')
	})
	
	participantsNextBtn.addEventListener('click', () => {
		driveSlides('next')
	})
	
	renderInfo()
	
	setInterval(() => {driveSlides('next')}, 4000)
}

getParticipantsSlider()
