import { useEffect } from 'react';

type TUseClose = {
	isMenuOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export function useClose({ isMenuOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isMenuOpen) return;

		function handleClickOutside(event: MouseEvent) {
			if (
				event.target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(event.target)
			) {
				onClose();
			}
		}

		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isMenuOpen, onClose]);
}
