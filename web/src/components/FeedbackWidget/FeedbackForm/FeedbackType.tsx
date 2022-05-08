import bugImgUrl from '../../../../assets/bug.svg'
import ideaImgUrl from '../../../../assets/idea.svg'
import thoughtImgUrl from '../../../../assets/thought.svg'

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugImgUrl,
			alt: 'Imagem de um inseto'
		},
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: ideaImgUrl,
			alt: 'Imagem de uma lampâda'
		}
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: thoughtImgUrl,
			alt: 'Imagem de um balão de pensamento'
		}
	}
}

export type FeedbackType = keyof typeof feedbackTypes;
