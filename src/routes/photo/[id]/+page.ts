import { error } from '@sveltejs/kit';
import { handleError } from '../../../lib/adapters/outbound/Errors';
import type { Photo } from '../../../lib/domain/Photo';
import type { PageLoad } from './$types';
import { parseNumericParameter } from '../../../helpers';
import { browser } from '$lib/services';

type SinglePhoto = {
	photo: Photo;
};

export const load: PageLoad<SinglePhoto> = async ({ params }) => {
	const id = parseNumericParameter(params.id, `Invalid photo ID '${params.id}' given`);

	try {
		const photo = await browser.loadPhoto(id);

		return { photo };
	} catch (err: unknown) {
		handleError(err);
		throw error(404, `Could not find photo with ID ${id}`);
	}
};
