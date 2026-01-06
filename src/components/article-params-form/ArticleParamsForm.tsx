import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type Props = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: containerRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);
	const handleFormChange = <K extends keyof ArticleStateType>(
		key: K,
		selected: ArticleStateType[K]
	) => {
		setFormState((prev) => ({
			...prev,
			[key]: selected,
		}));
	};
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(formState);
					}}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					{/*инпуты и селекты*/}
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							handleFormChange('fontFamilyOption', selected)
						}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							handleFormChange('fontSizeOption', selected)
						}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(selected) => handleFormChange('fontColor', selected)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(selected) =>
							handleFormChange('backgroundColor', selected)
						}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(selected) => handleFormChange('contentWidth', selected)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
