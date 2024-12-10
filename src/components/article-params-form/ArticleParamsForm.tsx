import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { useClose } from 'src/hooks/useClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsFormProps) => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [formState, setFormState] = useState({
		fontFamilyOption: articleState.fontFamilyOption,
		fontSizeOption: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});
	const menuRef = useRef<HTMLFormElement | null>(null);

	const handleMenuToggle = () => {
		setMenuOpen((prev) => !prev);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent<EventTarget>) => {
		event.preventDefault();
		setArticleState(formState);
	};

	useClose({
		isMenuOpen: isMenuOpen,
		onClose: handleMenuClose,
		rootRef: menuRef,
	});

	const menuClassName = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleMenuToggle} />
			<aside ref={menuRef} className={menuClassName}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) => {
							setFormState({
								...formState,
								fontFamilyOption: option,
							});
						}}
					/>

					<RadioGroup
						name='fontsize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) => {
							setFormState({
								...formState,
								fontSizeOption: option,
							});
						}}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) => {
							setFormState({
								...formState,
								fontColor: option,
							});
						}}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) => {
							setFormState({
								...formState,
								backgroundColor: option,
							});
						}}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина котнента'
						onChange={(option) => {
							setFormState({
								...formState,
								contentWidth: option,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
