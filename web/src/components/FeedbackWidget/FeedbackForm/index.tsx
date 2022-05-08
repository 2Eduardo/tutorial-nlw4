import { useState } from "react";
import { FeedbackContent } from "./FeedbackContent";
import { FeedbackSelectType } from "./FeedbackSelectType";
import { FeedbackSuccess } from "./FeedbackSuccess";
import { FeedbackType } from "./FeedbackType";

export function FeedbackForm() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [hasFeedbackSent, setHasFeedbackSent] = useState(false);

	function restoreFeedbackForm() {
		setHasFeedbackSent(false);
		setFeedbackType(null);
	}

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col
		items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
			{hasFeedbackSent ?
				<FeedbackSuccess onFeedbackSuccessFallback={restoreFeedbackForm} />
				: (
					<>
						{
							!feedbackType ?
								<FeedbackSelectType onFeedbackTypeChanges={setFeedbackType} />
								:
								<FeedbackContent
									feedbackType={feedbackType}
									onFeedbackContentFallback={restoreFeedbackForm}
									onFeedbackContentSent={() => setHasFeedbackSent(true)} />
						}
					</>
				)
			}

			<footer className="text-xs text-neutral-400">
				Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
			</footer>
		</div>
	);
}
