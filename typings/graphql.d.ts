import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {[X in Exclude<keyof T, K>]?: T[X]} & {[P in K]-?: NonNullable<T[P]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string,
	String: string,
	Boolean: boolean,
	Int: number,
	Float: number,
	DateTime: any,
	Commit: any,
	JSON: any,
	JSONObject: any,
};


export enum CodingLanguageEnum {
	Javascript = 'JAVASCRIPT'
}


export type CreateTokenInput = {
	accessToken: Scalars['String'],
};


export enum EditorEnum {
	Vscode = 'VSCODE'
}

export type EditorLoginInput = {
	editor: EditorEnum,
	machineId: Scalars['String'],
	sessionId: Scalars['String'],
};

export type EditorLoginOutput = {
	__typename?: 'editorLoginOutput',
	user: User,
	token: Scalars['String'],
};

export type GithubUser = {
	__typename?: 'GithubUser',
	id: Scalars['ID'],
	name?: Maybe<Scalars['String']>,
	email?: Maybe<Scalars['String']>,
	location?: Maybe<Scalars['String']>,
	avatarUrl?: Maybe<Scalars['String']>,
};



export type Level = {
	__typename?: 'Level',
	id: Scalars['ID'],
	title: Scalars['String'],
	text: Scalars['String'],
	stage?: Maybe<Stage>,
	stages: Array<Stage>,
	setup?: Maybe<StepActions>,
	status: 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE',
};


export type LevelStageArgs = {
	stageId: Scalars['ID']
};

export type Mutation = {
	__typename?: 'Mutation',
	editorLogin?: Maybe<EditorLoginOutput>,
};


export type MutationEditorLoginArgs = {
	input: EditorLoginInput
};

export type Query = {
	__typename?: 'Query',
	tutorial?: Maybe<Tutorial>,
	tutorials?: Maybe<Array<Maybe<Tutorial>>>,
	user?: Maybe<User>,
	level?: Maybe<Level>,
	stage?: Maybe<Stage>,
	step?: Maybe<Step>,
	stepActions?: Maybe<StepActions>,
};


export type QueryTutorialArgs = {
	id: Scalars['ID']
};


export type QueryLevelArgs = {
	id: Scalars['ID']
};


export type QueryStageArgs = {
	id: Scalars['ID']
};


export type QueryStepArgs = {
	id: Scalars['ID']
};


export type QueryStepActionsArgs = {
	id: Scalars['ID']
};

export enum Role {
	Admin = 'ADMIN',
	EditorUser = 'EDITOR_USER'
}

export type Stage = {
	__typename?: 'Stage',
	id: Scalars['ID'],
	title: Scalars['String'],
	text: Scalars['String'],
	step?: Maybe<Step>,
	steps: Array<Step>,
	setup?: Maybe<StepActions>,
	status: 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE',
};


export type StageStepArgs = {
	stepId: Scalars['ID']
};

export type Step = {
	__typename?: 'Step',
	id: Scalars['ID'],
	title: Scalars['String'],
	text: Scalars['String'],
	setup?: Maybe<StepActions>,
	solution?: Maybe<StepActions>,
	status: 'ACTIVE' | 'COMPLETE' | 'INCOMPLETE',
};

export type StepActions = {
	__typename?: 'StepActions',
	id: Scalars['ID'],
	commits: Array<Scalars['Commit']>,
	files: Array<Scalars['String']>,
	commands: Array<Scalars['String']>,
};

export enum TestRunnerEnum {
	Jest = 'JEST'
}

export type Tutorial = {
	__typename?: 'Tutorial',
	id: Scalars['ID'],
	repo: TutorialRepo,
	createdBy: User,
	createdAt: Scalars['DateTime'],
	updatedBy: User,
	updatedAt: Scalars['DateTime'],
	codingLanguage: CodingLanguageEnum,
	testRunner: TestRunnerEnum,
	title: Scalars['String'],
	text: Scalars['String'],
	releasedAt?: Maybe<Scalars['DateTime']>,
	releasedBy?: Maybe<User>,
	version: TutorialVersion,
	versions: Array<TutorialVersion>,
	completed: Scalars['Boolean'],
};


export type TutorialVersionArgs = {
	version?: Maybe<Scalars['String']>
};

export type TutorialRepo = {
	__typename?: 'TutorialRepo',
	tutorialId: Scalars['ID'],
	uri: Scalars['String'],
	branch: Scalars['String'],
	name: Scalars['String'],
	owner: Scalars['String'],
};

export type TutorialVersion = {
	__typename?: 'TutorialVersion',
	tutorialId: Scalars['ID'],
	version: Scalars['String'],
	coderoadVersion: Scalars['String'],
	createdAt: Scalars['DateTime'],
	createdBy: User,
	publishedAt?: Maybe<Scalars['DateTime']>,
	publishedBy?: Maybe<User>,
	level?: Maybe<Level>,
	levels: Array<Level>,
	stage?: Maybe<Stage>,
	step?: Maybe<Step>,
	completed: Scalars['Boolean'],
};


export type TutorialVersionLevelArgs = {
	levelId: Scalars['ID']
};


export type TutorialVersionStageArgs = {
	stageId: Scalars['ID']
};


export type TutorialVersionStepArgs = {
	stepId: Scalars['ID']
};

export type User = {
	__typename?: 'User',
	id: Scalars['ID'],
	name?: Maybe<Scalars['String']>,
	email?: Maybe<Scalars['String']>,
	location?: Maybe<Scalars['String']>,
	avatarUrl?: Maybe<Scalars['String']>,
	createdAt: Scalars['DateTime'],
	updatedAt: Scalars['DateTime'],
	githubUser?: Maybe<GithubUser>,
};

export type TutorialSummaryFragment = (
	{__typename?: 'Tutorial'}
	& Pick<Tutorial, 'title' | 'text'>
);



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{[key in TKey]: TResult}, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, {[key in TKey]: TResult}, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Query: ResolverTypeWrapper<{}>,
	ID: ResolverTypeWrapper<Scalars['ID']>,
	Tutorial: ResolverTypeWrapper<Tutorial>,
	TutorialRepo: ResolverTypeWrapper<TutorialRepo>,
	String: ResolverTypeWrapper<Scalars['String']>,
	User: ResolverTypeWrapper<User>,
	DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
	GithubUser: ResolverTypeWrapper<GithubUser>,
	CodingLanguageEnum: CodingLanguageEnum,
	TestRunnerEnum: TestRunnerEnum,
	TutorialVersion: ResolverTypeWrapper<TutorialVersion>,
	Level: ResolverTypeWrapper<Level>,
	Stage: ResolverTypeWrapper<Stage>,
	Step: ResolverTypeWrapper<Step>,
	StepActions: ResolverTypeWrapper<StepActions>,
	Commit: ResolverTypeWrapper<Scalars['Commit']>,
	Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
	Mutation: ResolverTypeWrapper<{}>,
	editorLoginInput: EditorLoginInput,
	EditorEnum: EditorEnum,
	editorLoginOutput: ResolverTypeWrapper<EditorLoginOutput>,
	JSON: ResolverTypeWrapper<Scalars['JSON']>,
	JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
	Role: Role,
	createTokenInput: CreateTokenInput,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Query: {},
	ID: Scalars['ID'],
	Tutorial: Tutorial,
	TutorialRepo: TutorialRepo,
	String: Scalars['String'],
	User: User,
	DateTime: Scalars['DateTime'],
	GithubUser: GithubUser,
	CodingLanguageEnum: CodingLanguageEnum,
	TestRunnerEnum: TestRunnerEnum,
	TutorialVersion: TutorialVersion,
	Level: Level,
	Stage: Stage,
	Step: Step,
	StepActions: StepActions,
	Commit: Scalars['Commit'],
	Boolean: Scalars['Boolean'],
	Mutation: {},
	editorLoginInput: EditorLoginInput,
	EditorEnum: EditorEnum,
	editorLoginOutput: EditorLoginOutput,
	JSON: Scalars['JSON'],
	JSONObject: Scalars['JSONObject'],
	Role: Role,
	createTokenInput: CreateTokenInput,
};

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = {requires?: Maybe<Maybe<Role>>}> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface CommitScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Commit'], any> {
	name: 'Commit'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export type EditorLoginOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['editorLoginOutput'] = ResolversParentTypes['editorLoginOutput']> = {
	user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
	token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type GithubUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['GithubUser'] = ResolversParentTypes['GithubUser']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
	name: 'JSON'
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
	name: 'JSONObject'
}

export type LevelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Level'] = ResolversParentTypes['Level']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<LevelStageArgs, 'stageId'>>,
	stages?: Resolver<Array<ResolversTypes['Stage']>, ParentType, ContextType>,
	setup?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
	editorLogin?: Resolver<Maybe<ResolversTypes['editorLoginOutput']>, ParentType, ContextType, RequireFields<MutationEditorLoginArgs, 'input'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
	tutorial?: Resolver<Maybe<ResolversTypes['Tutorial']>, ParentType, ContextType, RequireFields<QueryTutorialArgs, 'id'>>,
	tutorials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tutorial']>>>, ParentType, ContextType>,
	user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
	level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType, RequireFields<QueryLevelArgs, 'id'>>,
	stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<QueryStageArgs, 'id'>>,
	step?: Resolver<Maybe<ResolversTypes['Step']>, ParentType, ContextType, RequireFields<QueryStepArgs, 'id'>>,
	stepActions?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType, RequireFields<QueryStepActionsArgs, 'id'>>,
};

export type StageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stage'] = ResolversParentTypes['Stage']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	step?: Resolver<Maybe<ResolversTypes['Step']>, ParentType, ContextType, RequireFields<StageStepArgs, 'stepId'>>,
	steps?: Resolver<Array<ResolversTypes['Step']>, ParentType, ContextType>,
	setup?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>,
};

export type StepResolvers<ContextType = any, ParentType extends ResolversParentTypes['Step'] = ResolversParentTypes['Step']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	setup?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>,
	solution?: Resolver<Maybe<ResolversTypes['StepActions']>, ParentType, ContextType>,
};

export type StepActionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StepActions'] = ResolversParentTypes['StepActions']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	commits?: Resolver<Array<ResolversTypes['Commit']>, ParentType, ContextType>,
	files?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
	commands?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
};

export type TutorialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tutorial'] = ResolversParentTypes['Tutorial']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	repo?: Resolver<ResolversTypes['TutorialRepo'], ParentType, ContextType>,
	createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
	createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
	updatedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
	updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
	codingLanguage?: Resolver<ResolversTypes['CodingLanguageEnum'], ParentType, ContextType>,
	testRunner?: Resolver<ResolversTypes['TestRunnerEnum'], ParentType, ContextType>,
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	text?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	releasedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
	releasedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
	version?: Resolver<ResolversTypes['TutorialVersion'], ParentType, ContextType, TutorialVersionArgs>,
	versions?: Resolver<Array<ResolversTypes['TutorialVersion']>, ParentType, ContextType>,
	completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type TutorialRepoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TutorialRepo'] = ResolversParentTypes['TutorialRepo']> = {
	tutorialId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TutorialVersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TutorialVersion'] = ResolversParentTypes['TutorialVersion']> = {
	tutorialId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	version?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	coderoadVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
	createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
	createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
	publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
	publishedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
	level?: Resolver<Maybe<ResolversTypes['Level']>, ParentType, ContextType, RequireFields<TutorialVersionLevelArgs, 'levelId'>>,
	levels?: Resolver<Array<ResolversTypes['Level']>, ParentType, ContextType>,
	stage?: Resolver<Maybe<ResolversTypes['Stage']>, ParentType, ContextType, RequireFields<TutorialVersionStageArgs, 'stageId'>>,
	step?: Resolver<Maybe<ResolversTypes['Step']>, ParentType, ContextType, RequireFields<TutorialVersionStepArgs, 'stepId'>>,
	completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
	id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
	name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
	createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
	updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
	githubUser?: Resolver<Maybe<ResolversTypes['GithubUser']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
	Commit?: GraphQLScalarType,
	DateTime?: GraphQLScalarType,
	editorLoginOutput?: EditorLoginOutputResolvers<ContextType>,
	GithubUser?: GithubUserResolvers<ContextType>,
	JSON?: GraphQLScalarType,
	JSONObject?: GraphQLScalarType,
	Level?: LevelResolvers<ContextType>,
	Mutation?: MutationResolvers<ContextType>,
	Query?: QueryResolvers<ContextType>,
	Stage?: StageResolvers<ContextType>,
	Step?: StepResolvers<ContextType>,
	StepActions?: StepActionsResolvers<ContextType>,
	Tutorial?: TutorialResolvers<ContextType>,
	TutorialRepo?: TutorialRepoResolvers<ContextType>,
	TutorialVersion?: TutorialVersionResolvers<ContextType>,
	User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
	auth?: AuthDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;

export interface IntrospectionResultData {
	__schema: {
		types: {
			kind: string;
			name: string;
			possibleTypes: {
				name: string;
			}[];
		}[];
	};
}

// @ts-ignore
const result: IntrospectionResultData = {
	"__schema": {
		"types": []
	}
};

export default result;
